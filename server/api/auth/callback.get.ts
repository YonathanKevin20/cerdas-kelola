import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event)

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }

  const supabase = await serverSupabaseClient(event)

  const { error } = await supabase.auth.exchangeCodeForSession(''+code)

  if (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return sendRedirect(event, '/profile')
})
