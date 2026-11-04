# Portfólio · Thales Amaral

Site estático (HTML, CSS e um pouco de JS, sem build) para o GitHub Pages.

```
index.html               conteúdo da página
assets/css/styles.css    tokens de cor/tipografia no topo (:root), tema único claro
assets/img/pfp.jpeg      foto do perfil
assets/js/i18n.js        traduções em inglês e o seletor PT | EN
assets/thales-amaral-cv.pdf
.nojekyll                faz o Pages servir os arquivos como estão
```

## Publicar

1. Crie o repositório **`amaralthalesalves.github.io`**. Com esse nome o site fica em `https://amaralthalesalves.github.io`.
2. `git push` na branch `main`.
3. Em *Settings → Pages*, escolha *Deploy from a branch*, `main`, pasta `/ (root)`.

## Editar

- **Nova experiência:** copie um `<article class="card">`. Use `card--wide` para ocupar a largura toda; os demais ficam em duas colunas.
- **Projetos:** quando houver, crie uma seção com o mesmo padrão de cartões entre Experiência e Competências.
- **Cores e fontes:** altere apenas os tokens no topo de `styles.css`.

## Observação

Tudo o que estiver no repositório fica público pelo Pages, inclusive `info/` e o PDF do currículo, que tem seu telefone.

## Idiomas

O português fica no `index.html`. Cada texto traduzível tem um `data-i18n="chave"`, e a versão em inglês dessa chave fica em `assets/js/i18n.js`. Ao mudar um texto em PT, atualize a chave correspondente em EN.

A página abre no idioma do navegador (pt → PT, qualquer outro → EN). Também dá para forçar pelo link: `…/#en` ou `…/#pt`.
