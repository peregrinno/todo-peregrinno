# Todo Peregrinno

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0.0+-000000?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0+-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0+-3178C6?style=flat&logo=typescript)

Um aplicativo moderno de gerenciamento de tarefas construído com Next.js 15+ e React 19+. Todo Peregrinno oferece uma interface elegante para gerenciar suas tarefas diárias com múltiplas visualizações e recursos avançados.

[English version below](#english-version)

## Funcionalidades

- **Gerenciamento de Tarefas**: Criar, editar e excluir tarefas
- **Visualizações Múltiplas**: Alterne entre visualizações de lista e kanban
- **Persistência de Dados**: Armazenamento local para manter suas tarefas mesmo após fechar o navegador
- **Temas**: Suporte para tema claro e escuro
- **Interface Responsiva**: Design moderno e adaptável para desktop e dispositivos móveis
- **Drag and Drop**: Organize suas tarefas com facilidade usando drag and drop na visualização kanban

## Tecnologias Utilizadas

- **Next.js 15+**: Framework React com renderização do lado do servidor
- **React 19+**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para desenvolvimento mais seguro
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Radix UI**: Componentes de UI acessíveis e sem estilo próprio
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas
- **uuid**: Geração de IDs únicos
- **DND Kit**: Biblioteca para funcionalidades de drag and drop
- **date-fns**: Manipulação de datas
- **Next Themes**: Suporte a temas claro/escuro

## Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone https://github.com/peregrinno/todo-peregrinno.git
cd todo-peregrinno

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

## Executando o Projeto

Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o aplicativo em funcionamento.

## Estrutura do Projeto

- `/app`: Rotas e páginas da aplicação
- `/components`: Componentes reutilizáveis
- `/context`: Contextos React, incluindo o TaskContext
- `/hooks`: Hooks personalizados (ex: useLocalStorage)
- `/types`: Definições de tipos TypeScript
- `/public`: Ativos estáticos

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar o projeto.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

<a name="english-version" id="english-version"></a>
# Todo Peregrinno - English Version

A modern task management application built with Next.js 15+ and React 19+. Todo Peregrinno offers an elegant interface to manage your daily tasks with multiple views and advanced features.

## Features

- **Task Management**: Create, edit, and delete tasks
- **Multiple Views**: Switch between list and kanban views
- **Data Persistence**: Local storage to keep your tasks even after closing the browser
- **Themes**: Support for light and dark themes
- **Responsive Interface**: Modern and adaptable design for desktop and mobile devices
- **Drag and Drop**: Easily organize your tasks using drag and drop in the kanban view

## Technologies Used

- **Next.js 15+**: React framework with server-side rendering
- **React 19+**: Library for building interfaces
- **TypeScript**: Static typing for safer development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Headless, accessible UI components
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **uuid**: Unique ID generation
- **DND Kit**: Library for drag and drop functionality
- **date-fns**: Date manipulation
- **Next Themes**: Light/dark theme support

## Installation

Clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/peregrinno/todo-peregrinno.git
cd todo-peregrinno

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

## Running the Project

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Access [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Project Structure

- `/app`: Application routes and pages
- `/components`: Reusable components
- `/context`: React contexts, including TaskContext
- `/hooks`: Custom hooks (e.g., useLocalStorage)
- `/types`: TypeScript type definitions
- `/public`: Static assets

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the project.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
