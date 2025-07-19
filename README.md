# BEEFund Login

## Como hospedar na Vercel

Este guia fornece instruções passo a passo para hospedar o sistema de login do BEEFund na plataforma Vercel.

### Pré-requisitos

1. Ter uma conta na [Vercel](https://vercel.com/)
2. Ter o [Vercel CLI](https://vercel.com/docs/cli) instalado (opcional, mas recomendado)
3. Ter o Git instalado

### Método 1: Usando o Vercel CLI (Recomendado)

1. **Instale o Vercel CLI globalmente**

   ```bash
   npm install -g vercel
   ```

2. **Faça login na sua conta Vercel**

   ```bash
   vercel login
   ```

3. **Configure as variáveis de ambiente**

   Na plataforma Vercel, vá para seu projeto > Settings > Environment Variables e adicione:
   - `MONGODB_URI`: sua string de conexão do MongoDB Atlas
   - `JWT_SECRET`: sua chave secreta para JWT

4. **Implante o projeto**

   Na pasta raiz do projeto, execute:

   ```bash
   vercel
   ```

   Siga as instruções interativas. Quando perguntado se deseja sobrescrever as configurações, escolha "No" para usar o arquivo `vercel.json` existente.

5. **Para implantar em produção**

   ```bash
   vercel --prod
   ```

### Método 2: Usando o Dashboard da Vercel

1. **Crie um repositório Git**

   Primeiro, crie um repositório no GitHub, GitLab ou Bitbucket e envie seu código:

   ```bash
   git init
   git add .
   git commit -m "Primeiro commit"
   git remote add origin <URL_DO_SEU_REPOSITÓRIO>
   git push -u origin main
   ```

2. **Importe o projeto na Vercel**

   - Acesse [vercel.com/new](https://vercel.com/new)
   - Conecte sua conta do GitHub, GitLab ou Bitbucket
   - Selecione o repositório que você acabou de criar
   - Configure as variáveis de ambiente:
     - `MONGODB_URI`: sua string de conexão do MongoDB Atlas
     - `JWT_SECRET`: sua chave secreta para JWT
   - Clique em "Deploy"

### Notas importantes

1. **Variáveis de ambiente**
   - Nunca compartilhe seu arquivo `.env` no repositório
   - Configure todas as variáveis de ambiente no dashboard da Vercel

2. **Banco de dados**
   - Certifique-se de que seu cluster MongoDB Atlas permite conexões de qualquer IP (0.0.0.0/0) ou adicione os IPs da Vercel à lista de permissões

3. **Domínio personalizado**
   - Você pode configurar um domínio personalizado nas configurações do projeto na Vercel

4. **Atualizações**
   - Para atualizar seu site, basta enviar as alterações para o repositório Git conectado

5. **Monitoramento**
   - Use o dashboard da Vercel para monitorar implantações, logs e métricas de desempenho

### Solução de problemas

Se encontrar problemas durante a implantação:

1. Verifique os logs de implantação no dashboard da Vercel
2. Certifique-se de que todas as variáveis de ambiente estão configuradas corretamente
3. Verifique se o MongoDB Atlas está acessível e se as credenciais estão corretas
4. Consulte a [documentação da Vercel](https://vercel.com/docs) para problemas específicos