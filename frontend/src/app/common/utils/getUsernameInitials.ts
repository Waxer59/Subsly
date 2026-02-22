export function getUsernameInitials(username: string, numberOfInitials = 2) {
  const initials = username.split('').slice(0, numberOfInitials).join('');

  return initials.toUpperCase();
}
