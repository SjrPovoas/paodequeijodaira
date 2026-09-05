<p align="center">
  <img src="https://paodequeijodaira.vercel.app/logo-paodequeijodaira.jpg">
</p>

---
## SOBRE O PROJETO

Site desenvolvido em duas etapas por [SjrPovoaS](https://sjrpovoas.vercel.app/) para comércio Web2 em sua primeira parte. Em sua segunda fase, esse Comércio IRL desejan ingressar processos na blockchain e utilizar a força da Web3.


---
## MÍDIAS SOCIAIS
- [Site](https://paodequeijodaira.com.br/)
- [Instagram](https://www.instagram.com/paodequeijodaira/)
- [YouTube](https://www.youtube.com/@paodequeijodaira/)

<br>
<br>

---
## SUMÁRIO
👋 Bem-vindo ao repositório!
Se encontrar algum problema ou tiver alguma dúvida, por favor compartilhe conosco na aba [discussões/issues](https://github.com/SjrPovoas/paodequeijodaira/issues).

1. [Configurando conexão VScode com Github](https://github.com/SjrPovoas/paodequeijodaira/#1-configurando-conexao-vscode-com-github)
2. [Tecnologias Usadas](https://github.com/SjrPovoas/paodequeijodaira/#2-tecnologias-usadas)
3. [Recursos Utilizados na parte Visual](https://github.com/SjrPovoas/paodequeijodaira/#3-recursos-utilizados-na-parte-visual)
4. [Conheça o Time](https://github.com/SjrPovoas/paodequeijodaira/#4-conheca-o-time)

---
## 1. CONFIGURANDO CONEXÃO VSCODE COM GITHUB

**Para clonar esse Projeto, use:**

```
  git clone https://github.com/SjrPovoas/paodequeijodaira.git
```

### 1. Verifique a configuração do Git
Antes de fazer login, é importante verificar se você configurou seu nome de usuário e endereço de e-mail no Git.

Você pode fazer isso com os seguintes comandos, substituindo "Seu Nome" e "seu@email.com" pelas suas informações reais:
```
  git config --global user.name  "Seu Nome"
  git config --global user.email "usuario@email.com"
```
// Pra certificar que os dados foram salvos, use o seguinte comando:
```
  git config --list 
```

### 2. Fazendo o primeiro Commit

1. Inicializar um novo repositório Git no diretório atual.
```
  git init
```
2. Adicionar todos os arquivos modificados e novos à área de stage.
```
  git add .
```
3. Criar um novo commit com os arquivos na área de stage e uma mensagem de commit.
```
  git commit -m "Mensagem de commit"
```
4. Adicionar um repositório remoto ao seu projeto.
```
  git remote add <nome> <URL do repositório>
```
5. Empurrar seus commits para o repositório remoto.
```
  git push -u origin main
```
6. Rodar aplicação localmente.
```
  npm run dev
```
7. Parar o terminal
```
  CTRL + C
```
8. Verificar Alterações (Antes do Commit). Veja exatamente o que mudou em cada arquivo. 
```
  git diff
```


Esses são apenas alguns dos comandos mais comuns do **Git** que você pode usar na linha de comando.
```
npm install
```
```
npm install @getbrevo/brevo
```
```
npm install mercadopago
```
```
npm install @supabase/supabase-js
```
```
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```
```
npm install -D tailwindcss@3.4.4 postcss@latest autoprefixer@latest
```
```
npm cache clean --force
```
```
npx next dev
npm rebuild
npm run dev
```
```
npm install crypto-browserify stream-browserify browserify-zlib stream-http https-browserify assert os-browserify path-browserify url
```
```
npm install @emailjs/browser
```
```
npm install resend
```
```
npm install swiper
```

---
## 2. TECNOLOGIAS USADAS

<details>
<summary>FRONTEND</summary>
<ul>
<li>NEXT.JS</li>
<li>TAILWIND</li>
</ul>
</details>

<details>
<summary>BACKEND</summary>
<ul>
<li>JAVASCRIPT</li>
<li>BREVO (formulários de captura, Criação de fluxos de trabalho automatizados para entrega dos E-books e organizar o funil de vendas - CRM</li>
<li>SUPABASE (Banco de Dados da Loja LyfeStyle)</li>
<li>RESEND (Painel ADM - recuperação de senha e confirmação de cadastro)</li>
<li>MELHORENVIO (Plataforma gratuita de Logística para calcular, comparar e gerar etiqueta de envio)</li>
<li>(Painel ADMIN) [https://paodequeijodaira.com.br/admin/login]</li>
</ul>
</details>

---
## 3. RECURSOS UTILIZADOS NA PARTE VISUAL

****
<details>
<summary>FONTS</summary>

  - [Google Fonts](https://fonts.google.com/)

</details>

<details>
<summary>BOTÕES</summary>

  - [Bootstrap](https://icons.getbootstrap.com/)

</details>

<details>
<summary>GERADOR DE LINK DE WHATSAPP</summary>

  - [Zap Convertte](https://zap.convertte.com.br/gerador-link-whatsapp/)

</details>

<details>
<summary>GERADOR DE BOTÃO DE REDE SOCIAIS</summary>

  - [Shields.io](https://shields.io/badges)

</details>

<details>
<summary>CONSULTA A PALETA DE CORES</summary>

  - [Paleta de Cores](https://paletadecolores.online/)

</details>

<p>

## 4. CONFIGURAÇÃO DE REDIRECIONAMENTO

<details>
<summary>DOMÍNIO | CONFIGURAÇÃO | DESTINO</summary>
<ul>
<li>www.paodequeijodaira.com.br | Redirect (301)	       | paodequeijodaira.com.br</li>
ns1.vercel-dns.com <p>
ns2.vercel-dns.com
<li>paodequeijodaira.com.br     | Connect to Production |	(Nenhum, ele é o principal)</li>
ns1.vercel-dns.com <p>
ns2.vercel-dns.com
<li>paodequeijodaira.vercel.app | Redirect (301)	       | paodequeijodaira.com.br</li>
</ul>
</details>

---
## 5. FLUXO DE ENVIO E RECEBIMENTO DE EMAIL CORPORATIVO

<details>
<summary>IMPROVMX</summary>
<ul>
<li><b>Serviço de encaminhamento (RELAY)</b>
<br>
Ele não possui uma caixa de entrada para fazer login e ler e-mails. Ele apenas recebe a mensagem enviada para o seu domínio e a "empurra" instantaneamente para outro endereço (como o seu Gmail Corporativo).
<br>
O foco principal é o recebimento. Para responder ou enviar e-mails usando o seu domínio através dele, você configura o SMTP de outro provedor ou usa os recursos de "Enviar como" do Gmail.
<br>
Oferece um plano gratuito generoso com aliases ilimitados.
<br>
Uma vez dentro do painel do ImprovMX, você verá que ele já cria automaticamente um alias de * (catch-all) apontando para o seu Gmail. Se quiser criar especificamente o contato@, basta adicionar uma linha lá dentro.
<br>
Após salvar as alterações no DNS, o próprio painel do ImprovMX vai mostrar um aviso verde de "Active".
<br>
<li><b>Criar conta gratuita</b>
<br>
Acesse https://improvmx.com/ e utilize o email do gmail de preferência.
</li>
</ul>
</details>

---
## 6. CONHEÇA O TIME

Nome | Título | Linkedin | X/Twitter | GitHub | Instagram
---|---|---|---|---|---
Silvio Povoas | Desenvolvedor e Fundador | [sjrpovoas](https://www.linkedin.com/in/sjrpovoas) | [sjrpovoas](https://www.x.com/sjrpovoas) | [SjrPovoas](https://github.com/SjrPovoas) | [@silviopovoasjunior](https://www.instagram.com/silviopovoasjunior)
Antônia Iraleide | Fundadora | X | X | X | [@paodequeijodaira](https://www.instagram.com/paodequeijodaira)
***


<p align="center">
  &COPY; 2025-2026 Pão de Queijo da Irá
</p>