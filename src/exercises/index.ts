let dev = process.env.NODE_ENV === "development";
const link = (url: string) => {
  return `${dev ? "/" : "/computacao-grafica/"}${url}`;
};
document.body.innerHTML = `
<style>
  .container {
    padding-top: 36px;
    background-color: #eeeeee; 
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #101010
  }
  h1, h2 {
    margin-top: 0;
  }
  .title {

  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 6px 0;
  }
  .project-list {
    font-size: 1.1em;
  }
</style>
<div class='container'>
<h1>Bruno Ferreira Cangussu - Computação Gráfica 2019.1</h1>
<h2>Matrícula: 201565014AC</h2>
<h3>Trabalhos:</h3>
<ul class='project-list'>
  <li><a href='${link("trabalhoUm")}'>Primeiro Trabalho</a></li>
  <li><a href='${link("trabalhoDois")}'>Segundo Trabalho</a></li>
  <li><a href='${link("trabalhoTres")}'>Terceiro Trabalho</a></li>
</ul>
<h3>Exercícios:</h3>
<ul class='project-list'>
  <li><a href='${link("1-1")}'>Primeiro exercício</a></li>
  <li><a href='${link("arm")}'>Braço mecânico</a></li>
  <li><a href='${link("triangles")}'>Triangulos Windows</a></li>
  <li><a href='${link("bounce")}'>Bola quicando</a></li>
  <li><a href='${link("perspective")}'>Cubo em perspectiva</a></li>
  <li><a href='${link("basicAnimation")}'>Animação de senoide</a></li>
</ul>
</div>
`;
