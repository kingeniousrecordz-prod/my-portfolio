import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const settings = await db.getSiteSettings()
    const settingsMap: Record<string, string> = {}
    
    settings.forEach((setting: any) => {
      settingsMap[setting.key] = setting.value
    })
    
    return NextResponse.json(settingsMap)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const settings = body as Record<string, string>
    
    // Save each setting
    for (const [key, value] of Object.entries(settings)) {
      await db.updateSiteSetting(key, value)
    }
    
    return NextResponse.json({ message: 'Settings updated successfully' })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

