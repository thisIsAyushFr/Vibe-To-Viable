export const NURSE_PERMISSIONS = Object.freeze([
  'check_in_patients',
  'view_vitals',
  'edit_room_assignment',
  'edit_doctor_assignment'
]);

export function getNursePermissions() {
  return [...NURSE_PERMISSIONS];
}

export function canPerformNurseAction(action) {
  return NURSE_PERMISSIONS.includes(action);
}
