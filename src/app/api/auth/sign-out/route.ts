import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'

export async function POST() {
  // cookies().delete("name");

  const data = cookies().getAll()

  redirect('/home')
}
