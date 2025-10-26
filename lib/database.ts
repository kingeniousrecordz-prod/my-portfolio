import { supabaseAdmin } from './supabase';
import bcrypt from 'bcryptjs';

// Database functions using Supabase
export const db = {
  // Projects
  async getProjects(limit?: number) {
    try {
      let query = supabaseAdmin.from('projects').select('*').order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.warn('Supabase not configured, returning empty data:', error.message);
        return [];
      }
      return data || [];
    } catch (error) {
      console.warn('Database error, returning empty data:', error);
      return [];
    }
  },

  async getProject(id: number) {
    try {
      const { data, error } = await supabaseAdmin.from('projects').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      return null;
    }
  },

  async createProject(project: any) {
    try {
      const { data, error } = await supabaseAdmin.from('projects').insert(project).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  },

  async updateProject(id: number, project: any) {
    try {
      const { data, error } = await supabaseAdmin.from('projects').update(project).eq('id', id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  },

  async deleteProject(id: number) {
    try {
      const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  },

  // Beats
  async getBeats(limit?: number) {
    try {
      let query = supabaseAdmin.from('beats').select('*').order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.warn('Supabase not configured, returning empty data:', error.message);
        return [];
      }
      return data || [];
    } catch (error) {
      console.warn('Database error, returning empty data:', error);
      return [];
    }
  },

  async getBeat(id: number) {
    try {
      const { data, error } = await supabaseAdmin.from('beats').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      return null;
    }
  },

  async createBeat(beat: any) {
    try {
      const { data, error } = await supabaseAdmin.from('beats').insert(beat).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  },

  async updateBeat(id: number, beat: any) {
    try {
      const { data, error } = await supabaseAdmin.from('beats').update(beat).eq('id', id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  },

  async deleteBeat(id: number) {
    try {
      const { error } = await supabaseAdmin.from('beats').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  },

  // Admin users
  async getAdminUser(username: string) {
    try {
      const { data, error } = await supabaseAdmin.from('admin_users').select('*').eq('username', username).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      return null;
    }
  },

  // Site settings
  async getSiteSettings() {
    try {
      const { data, error } = await supabaseAdmin.from('site_settings').select('*');
      if (error) {
        console.warn('Supabase not configured, returning empty data:', error.message);
        return [];
      }
      return data || [];
    } catch (error) {
      console.warn('Database error, returning empty data:', error);
      return [];
    }
  },

  async updateSiteSetting(key: string, value: string) {
    try {
      const { data, error } = await supabaseAdmin.from('site_settings').upsert({ key, value }).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database error:', error);
      throw error;
    }
  }
};

// Insert default admin user (password: admin123) - run this once
// You can run this manually in Supabase or create a migration script
const hashedPassword = bcrypt.hashSync('admin123', 10);

export default db;
