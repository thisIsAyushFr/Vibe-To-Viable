import test from 'node:test';
import assert from 'node:assert/strict';
import { getNursePermissions, canPerformNurseAction } from '../src/utils/nursePermissions.js';

test('nurse permissions include only the helper-staff actions', () => {
  const permissions = getNursePermissions();

  assert.deepEqual(permissions, [
    'check_in_patients',
    'view_vitals',
    'edit_room_assignment',
    'edit_doctor_assignment'
  ]);
});

test('nurse action checks allow the intended helper actions only', () => {
  assert.equal(canPerformNurseAction('check_in_patients'), true);
  assert.equal(canPerformNurseAction('view_vitals'), true);
  assert.equal(canPerformNurseAction('edit_room_assignment'), true);
  assert.equal(canPerformNurseAction('edit_doctor_assignment'), true);
  assert.equal(canPerformNurseAction('discharge_patient'), false);
  assert.equal(canPerformNurseAction('prescribe_medication'), false);
});
