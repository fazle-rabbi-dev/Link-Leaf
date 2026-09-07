export function PUBLIC_PROFILE_URL(username: string | undefined) {
   if (!username) return '';

   return (
      window.location.protocol + '//' + window.location.host + '/' + username
   );
}
