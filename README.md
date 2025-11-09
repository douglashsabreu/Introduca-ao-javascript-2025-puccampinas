# JavaScript📚

Repositório com todos os exemplos práticos da aula de JavaScript, organizados de forma progressiva e executável.

## 📁 Estrutura do Projeto

```
javascript-aula/
│
├── README.md                          # Este arquivo
├── index.html                         # Página inicial com links para todos os exemplos
│
├── 01-fundamentos/                    # Bloco 1: Fundamentos
│   ├── 01-hello-world.html
│   ├── 02-variaveis.html
│   ├── 03-tipos-dados.html
│   ├── 04-operadores.html
│   └── 05-strings.html
│
├── 02-controle-fluxo/                 # Bloco 2: Controle de Fluxo
│   ├── 01-condicionais.html
│   ├── 02-operadores-logicos.html
│   ├── 03-switch.html
│   ├── 04-loops.html
│   └── 05-break-continue.html
│
├── 03-funcoes/                        # Bloco 3: Funções
│   ├── 01-funcoes-basicas.html
│   ├── 02-parametros-return.html
│   ├── 03-arrow-functions.html
│   └── 04-escopo.html
│
├── 04-arrays-objetos/                 # Bloco 4: Arrays e Objetos
│   ├── 01-arrays.html
│   ├── 02-metodos-arrays.html
│   ├── 03-map-filter.html
│   ├── 04-objetos.html
│   └── 05-arrays-objetos.html
│
├── 05-dom/                            # Bloco 5: DOM e Interatividade
│   ├── 01-selecionar-elementos.html
│   ├── 02-manipular-conteudo.html
│   ├── 03-eventos.html
│   ├── 04-inputs.html
│   └── 05-localstorage.html
│
└── 06-projeto-final/                  # Bloco 6: To-Do List
    ├── todo-list.html                 # Aplicação completa
    ├── styles.css                     # Estilos
    └── script.js                      # Lógica JavaScript
```

## 🚀 Como Usar

1. **Clone ou baixe este repositório**
2. **Abra o arquivo `index.html`** no seu navegador
3. **Navegue pelos exemplos** usando os links organizados por tópico
4. **Abra o Console do navegador** (F12) para ver os outputs dos exemplos

### Servindo o `index.html` com NestJS (opcional)

Se preferir demonstrar o material via servidor, há um projeto Nest já configurado na pasta `aula_java_script_web_server`:

```
cd aula_java_script_web_server
npm install          # apenas na primeira vez
npm run start:dev    # inicia o servidor em http://localhost:3000
```

Rota disponíveis:
- `GET /` – retorna o conteúdo do `index.html`
- `GET /info` – exemplo simples de rota JSON para fins didáticos

## 💡 Para Professores

Cada arquivo HTML é autocontido e pode ser demonstrado individualmente. Os exemplos seguem a progressão da apresentação e incluem:

- Comentários explicativos no código
- Console.log para visualizar resultados
- Exemplos práticos e aplicáveis
- Estrutura visual simples para focar no JavaScript

## 🎯 Projeto Final

O projeto final está na pasta `06-projeto-final/` e inclui um To-Do List completo com:
- Adicionar tarefas
- Marcar como completa
- Excluir tarefas
- Persistência com LocalStorage
- Interface responsiva

## 📖 Conceitos Abordados

- Variáveis e Tipos de Dados
- Operadores
- Estruturas Condicionais
- Loops e Iteração
- Funções
- Arrays e Métodos
- Objetos
- Manipulação do DOM
- Eventos
- LocalStorage
- Projeto Completo

## 🌟 Dicas de Apresentação

1. Comece sempre abrindo o Console (F12)
2. Execute os exemplos ao vivo quando possível
3. Encoraje os alunos a modificarem os valores
4. Use o projeto final como motivação desde o início

---

**Desenvolvido para fins educacionais - PUC-Campinas**
