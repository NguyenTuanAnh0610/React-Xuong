import React from "react"

const AboutPage = () => {
    return  (
        <>
       <section>
  <div className="container flow-content mb-20 ">
    <h2 className="section-title">Our team</h2>
    <ul role="list" className="grid">
      <li>
        <article className="card1" data-visible="false">
          <div className="card__front flow-content">
            <img className="card__img mx-auto" src="/img/radiant-gradient.png" />
            <div className="flow-content" data-spacing="sm">
              <p className="card__name">Nguyễn Tuấn Anh</p>
              <p className="card__position">Software Engineer</p>
            </div>
          </div>
          <footer className="card__footer">
            <button data-card-controller className="card__toggle">
              <i className="fa-solid fa-plus card__toggle-icon" />
            </button>
          </footer>
        </article>
      </li>

    </ul>
  </div>
</section>

        </>
    );
};

export default AboutPage;