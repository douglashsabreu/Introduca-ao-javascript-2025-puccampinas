import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getIndexHtml(): string {
    const indexPath = join(process.cwd(), '..', 'index.html');
    return readFileSync(indexPath, 'utf8');
  }

  getLessonInfo() {
    return {
      rota: 'GET /info',
      objetivo: 'Exemplo simples de rota no NestJS para fins didáticos',
      conteudo: 'Retorna um objeto com informações da aula',
    };
  }
}
