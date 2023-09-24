import { Test } from '@nestjs/testing';
import { PSConfigService } from './config.service';
import { PS_CONFIG_PARAMETERS } from '../constants';
import { mockData } from '../../tests/mockdata';

describe('PSConfigService', () => {
  let psConfigService: PSConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PSConfigService,
        {
          provide: PS_CONFIG_PARAMETERS,
          useValue: mockData,
        },
      ],
    }).compile();

    psConfigService = moduleRef.get(PSConfigService);
  });

  describe('get()', () => {
    it('should return value for existing parameter', () => {
      const value = psConfigService.get('post-table', 'fake');
      expect(value).toBe('ProductionPostTable');
      expect(typeof value).toBe('string');
    });

    it('should return a default value for not found parameter', () => {
      expect(psConfigService.get('unknown', null)).toBeNull();
      expect(psConfigService.get('unknown', '')).toBe('');
    });
  });

  describe('getBool()', () => {
    it('should return true for truthy values', () => {
      const value = psConfigService.getBool('signup-with-facebook', false);
      expect(value).toBeTruthy();
      expect(typeof value).toBe('boolean');
    });

    it('should return false for falsy values', () => {
      const value = psConfigService.getBool('signup-with-google', true);
      expect(value).toBeFalsy();
      expect(typeof value).toBe('boolean');
    });

    it('should return a default value for not found parameter', () => {
      expect(psConfigService.getBool('unknown', true)).toBeTruthy();
      expect(psConfigService.getBool('unknown', false)).toBeFalsy();
    });
  });

  describe('getNumber()', () => {
    it('should return a number', () => {
      const value = psConfigService.getNumber('port', 0);
      expect(value).toBe(3000);
      expect(typeof value).toBe('number');
    });

    it('should return a default value for not found parameter', () => {
      const value = psConfigService.getNumber('unknown', 5000);
      expect(value).toBe(5000);
    });
  });
});
