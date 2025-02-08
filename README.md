# Planning Poker - Frontend

Interface do usuário para o Planning Poker, uma ferramenta para estimativas ágeis em equipe.

## 🚀 Tecnologias

- React 18
- TypeScript
- Material-UI (MUI)
- Socket.IO Client
- Vite

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```

## 🏃‍♂️ Rodando o projeto

### Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:3000`

### Produção
```bash
npm run build
npm run preview
# ou
yarn build
yarn preview
```

## 📦 Deploy

Para fazer deploy no Vercel:

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `VITE_API_URL`: URL do backend
   - `VITE_SOCKET_URL`: URL do backend (mesma que acima)
3. Deploy!

## 🎮 Funcionalidades

- **Gestão de Salas**
  - Criação de salas com nomes personalizados
  - Entrada em salas existentes via ID
  - Cópia fácil do ID da sala

- **Sistema de Votação**
  - Cartas com valores pré-definidos (0-21)
  - Votação em tempo real
  - Revelação simultânea com countdown
  - Cálculo automático de média

- **Interface**
  - Design responsivo
  - Tema claro/escuro automático
  - Animações de revelação
  - Lista de participantes
  - Histórico de mensagens

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.