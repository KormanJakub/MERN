import {useState} from "react";
import {Carousel} from "primereact/carousel";
import {Button} from "primereact/button";

const HomePage = ({ onSelect }) => {

  const [mainPagePhotos] = useState([
    {
      image: 'src/assets/main-page-1.jpg',
      title: 'Len Tie Najlepšie Informácie',
    },
    {
      image: 'src/assets/main-page-2.jpg',
      title: 'Najrychlejšie Informácie',
    },
    {
      image: 'src/assets/main-page-3.jpg',
      title: 'Najlepšia Kvalita Informácií',
    },
    {
      image: 'src/assets/main-page-4.jpg',
      title: 'Najlepší Novináry zo Slovenska',
    }
  ]);

  return (
    <div className="home-page bg-gray-300">
      <Carousel 
        value={mainPagePhotos}
        autoplayInterval={5000}
        circular={true}
        numScroll={1}
        numVisible={1}
        showIndicators={false}
        itemTemplate={(mainPagePhoto) => {
          return (
            <div className="flex align-items-center p-3 justify-content-center" style={{
              backgroundImage: `url(${mainPagePhoto.image})`,
              width: '100%',
              height: '50rem',
              objectFit: "none",
              objectPosition: "center",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover"
            }}>
              <div>
                <div className="flex flex-column">
                  <div className="flex flex-row align-items-center">
                  <div className={`line`}
                     style={
                      {
                          width: '1.7rem',
                          height: '0.1rem',
                      }}/>
                      <p className="ml-3 font-bold text-6xl text-white bg-black-alpha-90">NOVINY.SK</p>                                  
                  </div>

                  <div className="grid">
                    <h1 className="col-7 pl-2 font-bold text-white bg-black-alpha-90">{mainPagePhoto.title}</h1>
                    <div className="col-5 pl-2"></div>
                  </div>

                  <Button label="VŠETKY ČLÁNKY"
                    type={'button'}
                    className={`p-button-raised p-button-rounded p-button m-2 p-2`}
                    icon={'pi pi-users'}
                    iconPos={'left'}
                    style={{
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: 'var(--coffee-color)'
                    }}
                    onClick={() => onSelect("articles")}
                    />
                    <Button label="PRIHLÁSIŤ SA"
                    type={'button'}
                    className={`p-button-raised p-button-rounded p-button m-2 p-2`}
                    icon={'pi pi-user'}
                    iconPos={'left'}
                    style={{
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: 'var(--coffee-color)'
                    }}
                    />

                    <Button label="REGISTRÁCIA"
                    type={'button'}
                    className={`p-button-raised p-button-rounded p-button m-2 p-2`}
                    icon={'pi pi-user-plus'}
                    iconPos={'left'}
                    style={{
                        color: 'black',
                        backgroundColor: 'white',
                        borderColor: 'var(--white)'
                    }}
                    />
                </div>
              </div>

            </div>
          )
        }}
      />
      <div className="flex align-items-center justify-content-center">
        <h1>Prečo píšeme noviny?</h1>
      </div>
      <div className="flex gap-4">
        <p class="white-space-normal w-10"><b>1. Moc slova:</b> Ako novinár máte príležitosť hovoriť za tých, ktorí nemajú hlas. Môžete poukázať na sociálne nespravodlivosti, politické zápletky alebo environmentálne problémy. Vaše slová môžu inšpirovať zmeny a viesť k lepšej budúcnosti.</p>
        <p class="white-space-normal w-10"><b>2. Vzdelávanie a informovanie:</b> Noviny sú nástrojom pre vzdelávanie. Poskytujú dôležité informácie o tom, čo sa deje vo svete. Vzdelávanie čitateľov o zložitých problémoch môže viesť k lepšiemu pochopeniu a informovaným rozhodnutiam vo voľbách a verejnom živote.</p>
        <p class="white-space-normal w-10"><b>3. Profesionálny rast:</b> Písanie novín vás nutí neustále sa vzdelávať, rozvíjať kritické myslenie a zdokonaľovať schopnosť efektívnej komunikácie. Tieto zručnosti sú cenné v mnohých profesionálnych a osobných situáciách.</p>
        <p class="white-space-normal w-10"><b>4. Dokumentácia histórie:</b>Novinári dokumentujú udalosti pre budúce generácie. Práca, ktorú vykonávate dnes, môže slúžiť ako dôležitý historický záznam, ktorý pomôže ľuďom v budúcnosti pochopiť, ako sa formoval ich svet.</p>
        <p class="white-space-normal w-10"><b>5. Osobná spokojnosť:</b> Napísanie dobre prijatého článku môže priniesť veľkú osobnú spokojnosť. Vidieť, ako vaše slová rezonujú s čitateľmi a vyvolávajú diskusie alebo dokonca akcie, je nesmierne odmeňujúce.</p>
        <p class="white-space-normal w-10"><b>6. Písanie novín</b> je teda nielen o odovzdávaní informácií, ale o budovaní základov pre informovanú a zapojenú spoločnosť. Je to práca, ktorá má hlboký dopad na osobný aj profesionálny život a ktorá môže skutočne zmeniť svet k lepšiemu. Nech už ste na začiatku svojej kariéry alebo už máte skúsenosti, neustále hľadanie pravdy a spravodlivosti by malo byť vašou hnacou silou v novinárskej profesii.</p>
      </div>
    </div>
  );
};

export default HomePage;
