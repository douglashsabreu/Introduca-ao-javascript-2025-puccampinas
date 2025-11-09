import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the contents of index.html', () => {
      const expected = readFileSync(join(process.cwd(), '..', 'index.html'), 'utf8');
      expect(appController.getIndex()).toBe(expected);
    });
  });

  describe('info route', () => {
    it('should return lesson info data', () => {
      expect(appController.getLessonInfo()).toEqual({
        rota: 'GET /info',
        objetivo: 'Exemplo simples de rota no NestJS para fins didáticos',
        conteudo: 'Retorna um objeto com informações da aula',
      });
    });
  });
});
