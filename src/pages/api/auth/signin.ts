import type { APIRoute } from 'astro'
import { supabase } from '@lib/supabase/supabase'
import type { OAuthResponse } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ redirect }) => {

  const { error, data }: OAuthResponse = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: "http://localhost:4321/api/auth/callback",
      scopes: "identify guilds guilds.members.read"
    }
  });

  if (error) {
    return new Response(error.message, { status: 401 } )
  }

  return redirect(data.url)
}
