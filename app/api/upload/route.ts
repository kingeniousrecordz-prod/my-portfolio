import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'image' or 'audio'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
    const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg']
    
    if (type === 'image' && !allowedImageTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid image file type' }, { status: 400 })
    }
    
    if (type === 'audio' && !allowedAudioTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid audio file type' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`${type}/${filename}`, file)

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl, filename })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}
