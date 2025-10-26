import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const genre = searchParams.get('genre')

    let beats = await db.getBeats(limit ? parseInt(limit) : undefined)
    
    if (genre) {
      beats = beats.filter(beat => beat.genre === genre)
    }

    return NextResponse.json(beats)
  } catch (error) {
    console.error('Error fetching beats:', error)
    return NextResponse.json({ error: 'Failed to fetch beats' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, audio_url, cover_image_url, genre, duration } = body

    if (!title || !audio_url) {
      return NextResponse.json({ error: 'Title and audio URL are required' }, { status: 400 })
    }

    const beat = await db.createBeat({
      title,
      description,
      audio_url,
      cover_image_url,
      genre,
      duration
    })

    return NextResponse.json({ id: beat.id, message: 'Beat created successfully' })
  } catch (error) {
    console.error('Error creating beat:', error)
    return NextResponse.json({ error: 'Failed to create beat' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, audio_url, cover_image_url, genre, duration } = body

    if (!id) {
      return NextResponse.json({ error: 'Beat ID is required' }, { status: 400 })
    }

    await db.updateBeat(id, {
      title,
      description,
      audio_url,
      cover_image_url,
      genre,
      duration
    })

    return NextResponse.json({ message: 'Beat updated successfully' })
  } catch (error) {
    console.error('Error updating beat:', error)
    return NextResponse.json({ error: 'Failed to update beat' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Beat ID is required' }, { status: 400 })
    }

    await db.deleteBeat(parseInt(id))

    return NextResponse.json({ message: 'Beat deleted successfully' })
  } catch (error) {
    console.error('Error deleting beat:', error)
    return NextResponse.json({ error: 'Failed to delete beat' }, { status: 500 })
  }
}
