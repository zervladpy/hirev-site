import type { APIRoute } from "astro";
import { supabase } from "@lib/supabase/supabase";
import { log } from "node_modules/astro/dist/core/logger/core";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get('code');

  console.log('url' + url)

  if (!authCode) {
    return new Response("No code", { status: 400 });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

  if (error) {
    return new Response(error.message, { status: 401 });
  }

  const { access_token, refresh_token, provider_token } = data.session;

  const guilds = await fetch('https://discord.com/api/v10/users/@me/guilds/704670957863960586/member', {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + provider_token }
  }).then(res => res.json()).catch(e => console.log(e))

  console.log(guilds) 

  cookies.set("sb-access-token", access_token, { path: "/" })
  cookies.set("sb-refresh-token", refresh_token, { path: "/" })

  return redirect("/")
}
