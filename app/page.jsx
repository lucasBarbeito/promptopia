import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      {/* Cuando los Tags tienen un '_' en ellos, significa que viene de mis styles, en este caso de Globals.css */}
      <h1 className="head_text text-center">
        Discover & Share
        {/* El "max-md:hidden" , es separar los 2 textos en pantallas grandes, pero en chicas no estan una debajo de la otra  */}
        <br className="max-md:hidden"></br>
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for moder world to
        discover, create and shrare crative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
