import './css/About.css'
import About_Img from '../assets/about.jpeg'
import About1 from '../assets/about1.webp'
import About2 from '../assets/about2.webp'

export default function About() {
  return (
    <>
      {/* about hero section */}
      <div className='about'>
        <div className='about-background' style={{ backgroundImage: `url(${About_Img})` }}></div>
        <div className='about-overlay'></div>
        <div className='about-content'>
          <h1>ABOUT</h1>
        </div>
      </div>
      {/* about hero section end */}

      {/* ---------------------------------------------------------------------- */}

      {/* story section start */}
      <div className="story">
        <div className='story-detail'>
          <h1>Our Story</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris consequat consequat enim, non auctor massa ultrices non.
            Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci v
            arius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque hab
            itant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas g
            ravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum
            enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin
            ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tem
            por elit.
            <br /><br />

            Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget li
            gula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicu
            la. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus
            a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutru
            m, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commod
            o efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.
            <br /><br />

            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or ca
            ll us on (+1) 96 716 6879
          </p>
        </div>
        <div className="about-img">
          <img src={About1} alt="" />
        </div>
      </div>
      {/* story section end */}

      {/* ------------------------------------------------------------------------ */}

    <hr />

      {/* mission start the same style with story */}
      <div className="story">
        <div className="about-img">
          <img src={About2} alt="" />
        </div>
        <div className='story-detail'>
          <h1>Our Story</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris consequat consequat enim, non auctor massa ultrices non.
            Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue. Orci v
            arius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Maecenas varius egestas diam, eu sodales metus scelerisque congue. Pellentesque hab
            itant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas g
            ravida justo eu arcu egestas convallis. Nullam eu erat bibendum, tempus ipsum eget, dictum
            enim. Donec non neque ut enim dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin
            ut est diam. Donec condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tem
            por elit.
            <br /><br />

            Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget li
            gula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicu
            la. Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus
            a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum rutru
            m, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum, turpis ut commod
            o efficitur, quam velit convallis ipsum, et maximus enim ligula ac ligula.
            <br /><br />

            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or ca
            ll us on (+1) 96 716 6879
          </p>
        </div>
      </div>
      {/* mission end */}

    </>
  )
}
