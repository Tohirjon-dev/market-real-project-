import { BadRequestException } from '@nestjs/common';

export async function extractLocalPhoneNumber(phone: string): Promise<string> {
  const allowedCharacters = phone.replace(/[^0-9+\s-]/g, '');
  if (/[^0-9\s\+\-]/.test(allowedCharacters)) {
    throw new BadRequestException(
      "Telefon raqamida faqat raqamlar, +, -, va bo'sh joy bo'lishi mumkin",
    );
  }
  const digitsOnly = allowedCharacters.replace(/\D/g, '');
  if (!digitsOnly.startsWith('998') || digitsOnly.length !== 12) {
    throw new BadRequestException(
      "Telefon raqam 998 bilan boshlanadigan 12 xonali bo'lishi kerak",
    );
  }

  const localPart = digitsOnly.slice(3);
  return localPart;
}
