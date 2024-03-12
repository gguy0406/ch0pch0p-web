import { saveRegisterForm } from '../db/event-registers';
import { EventRegister } from '../lib/types';

export async function register(eventRegister: EventRegister) {
  await saveRegisterForm(eventRegister);
}
