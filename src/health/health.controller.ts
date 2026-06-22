import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
@Controller('health')
export class HealthController {
  @Version(VERSION_NEUTRAL)
  @Get() check() { return { status: 'OK', service: 'ms-bs-master-practitioner', timestamp: new Date().toISOString() }; }
}