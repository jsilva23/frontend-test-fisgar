# Imobiliária Web - Teste Prático

## Descrição do Projeto
Este projeto consiste em uma aplicação web para listagem de imóveis, desenvolvida utilizando **React com TypeScript e Next.js**. A aplicação consome dados de uma **API REST fictícia**, fornecendo funcionalidades de busca e filtragem.

## Tecnologias Utilizadas
- **React** com **Next.js** para renderização otimizada e roteamento
- **TypeScript** para tipagem segura
- **Material UI** para componentes estilizados e responsivos
- **React Hooks e Context API** para gerenciamento de estado global
- **Vitest** para testes automatizados
- **JSON Server** para simulação da API REST
- **Git** para versionamento do código

## Como Executar o Projeto
### 1. Clonar o Repositório
```sh
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instalar Dependências
```sh
npm install
```

### 3. Iniciar a API Simulada (JSON Server)
A API REST fictícia roda na porta **5000**. Para iniciá-la, execute:
```sh
npm run server
```

### 4. Iniciar o Servidor Next.js
```sh
npm run dev
```
A aplicação estará disponível em **http://localhost:3000**.

## Estrutura do Projeto
```
/
├── public/           # Arquivos estáticos
├── src/
│   ├── components/   # Componentes reutilizáveis
│   ├── app/          # Páginas do Next.js       
│   ├── styles/       # Estilos globais
├── .gitignore
├── package.json
├── README.md
```

## Decisões Técnicas
- **Material UI** foi utilizado para composição da interface, garantindo um design responsivo e acessível.
- **Context API** foi escolhida para compartilhar estados globais, especialmente entre a lista de imóveis e o filtro.
- **Vitest** foi aplicado para cobertura de testes em componentes e funcionalidades principais.

## Funcionalidades
✅ Listagem de imóveis consumindo API REST
✅ Busca e filtragem de imóveis em tempo real
✅ Interface responsiva baseada no Material UI
✅ Gerenciamento global de estado com Context API
✅ Roteamento entre páginas via Next.js
✅ Testes automatizados garantindo qualidade do código

## Testes Automatizados
Para rodar os testes, utilize o comando:
```sh
npm run test
```

---
Projeto desenvolvido como parte de um teste técnico para avaliação de habilidades em **React, TypeScript e Next.js**.

