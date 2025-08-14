<template>
  <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nostrum!</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque eveniet quod aperiam magni ex vel mollitia odio repellendus delectus?
    Velit commodi eaque laborum officiis adipisci culpa, doloremque iste possimus fugiat animi dicta vitae aperiam quaerat vero rem perferendis, ullam
    ducimus, sunt voluptas praesentium sit alias consectetur tempora eveniet. Sequi consequatur, quas, dicta delectus aspernatur molestias, beatae
    odit veritatis reprehenderit pariatur accusantium quidem sapiente! Natus, qui illum quo iste consectetur sapiente est in nemo vitae, laboriosam
    nesciunt nostrum suscipit adipisci perspiciatis expedita quod ab cupiditate voluptatum! Illo, officiis accusantium numquam nostrum rem inventore
    minus ullam sint! Recusandae corrupti consequuntur sequi, eveniet ipsam maiores error ut quam minima ullam, qui quas laboriosam odio odit
    dignissimos iusto delectus aut nemo, doloremque nisi eaque? Placeat, facilis dignissimos. Temporibus illo laudantium culpa natus odit
    necessitatibus minima id sit nihil unde totam commodi fugiat optio quibusdam hic quo exercitationem enim quasi, accusantium cumque nemo
    consectetur nesciunt accusamus pariatur? Itaque officiis cumque quae rem? Exercitationem molestiae, doloribus corporis assumenda ab tenetur at
    voluptatem error a voluptatum eum perferendis? Molestiae error excepturi tenetur eum voluptatibus eius incidunt! Suscipit natus architecto atque
    obcaecati cum ullam velit. Nemo ab quasi quae accusamus necessitatibus beatae quia! Illo, delectus! Quae reprehenderit voluptatem asperiores iure
    consequuntur accusamus, cum a harum dicta consequatur saepe vero possimus eveniet ad autem delectus porro magni. Dolores, sapiente qui. Culpa
    illum voluptatem harum repudiandae nobis atque, quo dolores deserunt id esse. Hic adipisci eius culpa reprehenderit laboriosam doloribus,
    voluptatum voluptatem inventore obcaecati quis, voluptates fuga sint sed. Maiores amet itaque accusamus necessitatibus aspernatur quia vitae
    cupiditate saepe vel repellat iste fuga suscipit cum nobis molestias asperiores quae neque facere illum totam eos, libero, inventore beatae
    fugiat? Eveniet nesciunt deleniti dolore doloremque excepturi perferendis, molestias culpa natus ullam ab! Porro reiciendis perspiciatis, fuga
    natus debitis labore tenetur temporibus?
  </p>
  <div id="langWidget" translate="no">
    <div id="google_translate_element" style="display: none"></div>
    <div class="langDefault">
      <div class="langSelected">
        <div class="langSelectedLabel"></div>
        <img class="langSelectedImg" src="" alt="" />
      </div>
      <div class="langOption"></div>
    </div>
  </div>
</template>

<script>
const flags = {
  th: {
    img: "https://flagcdn.com/th.svg",
    label: "Thai",
  },
  en: {
    img: "https://flagcdn.com/gb-eng.svg",
    label: "English",
  },
  "zh-CN": {
    img: "https://flagcdn.com/cn.svg",
    label: "Chinese",
  },
  ja: {
    img: "https://flagcdn.com/jp.svg",
    label: "Japanese",
  },
  ko: {
    img: "https://flagcdn.com/kr.svg",
    label: "Korean",
  },
  de: {
    img: "https://flagcdn.com/de.svg",
    label: "German",
  },
  it: {
    img: "https://flagcdn.com/it.svg",
    label: "Italian",
  },
  es: {
    img: "https://flagcdn.com/es.svg",
    label: "Spanish",
  },
  pt: {
    img: "https://flagcdn.com/pt.svg",
    label: "Portuguese",
  },
  fr: {
    img: "https://flagcdn.com/fr.svg",
    label: "French",
  },
  ru: {
    img: "https://flagcdn.com/ru.svg",
    label: "Russian",
  },
};

const resetIcon = "https://itp1.itopfile.com/ImageServer/z_itp_24092023yxze/0/0/refreshz-z936732409505.png";

function googleTranslateElementInit() {
  new google.translate.TranslateElement({ pageLanguage: "th" }, "google_translate_element");
}

function defaultSelected(lang) {
  const langSelectedImg = document.querySelector(".langSelectedImg");
  const langSelectedLabel = document.querySelector(".langSelectedLabel");
  if (flags[lang]) {
    langSelectedImg.src = flags[lang].img;
    langSelectedImg.alt = flags[lang].label;
    langSelectedLabel.textContent = flags[lang].label;
  } else {
    langSelectedImg.src = flags["th"].img;
    langSelectedImg.alt = flags["th"].label;
    langSelectedLabel.textContent = flags["th"].label;
  }
}

const changeLanguage = (lang) => {
  const dropdown = document.querySelector(".goog-te-combo");
  if (!dropdown) return;
  dropdown.value = lang;
  dropdown.dispatchEvent(new Event("change"));

  setTimeout(() => {
    defaultSelected(lang);
  }, 0);
};

const resetLanguage = () => changeLanguage("th");

$(document).ready(() => {
  $(document).on("click", (e) =>
    $(e.target).closest("#langWidget").length ? $(".langDefault").toggleClass("open") : $(".langDefault").removeClass("open")
  );

  const dropdown = document.querySelector(".langOption");
  if (!dropdown) return;

  const langOptionsWrapper = document.createElement("div");
  langOptionsWrapper.className = "langOptionsWrapper";

  Object.entries(flags).forEach(([lang, { img, label }]) => {
    const wrapper = document.createElement("div");
    wrapper.className = "langFlag";
    wrapper.dataset.lang = lang;

    const image = document.createElement("img");
    image.src = img;
    image.alt = label;

    const text = document.createElement("div");
    text.textContent = label;

    wrapper.appendChild(image);
    wrapper.appendChild(text);

    wrapper.addEventListener("click", () => changeLanguage(lang));
    langOptionsWrapper.appendChild(wrapper);
  });

  const resetDiv = document.createElement("div");
  resetDiv.className = "langFlag reset";
  const resetImage = document.createElement("img");
  resetImage.src = resetIcon;
  resetImage.alt = "Reset Language";
  const resetText = document.createElement("div");
  resetText.textContent = "Reset";

  resetDiv.appendChild(resetImage);
  resetDiv.appendChild(resetText);
  resetDiv.addEventListener("click", resetLanguage);

  langOptionsWrapper.appendChild(resetDiv);
  dropdown.appendChild(langOptionsWrapper);

  defaultSelected("th");
});
</script>

<style>
#language_member_bar {
  display: none;
}

.skiptranslate iframe {
  display: none !important;
}

.skiptranslate {
  margin-top: -40px;
}

.no-js #langWidget {
  position: fixed;
  top: 5px;
  right: 10px;
  width: fit-content;
  height: auto;
  z-index: 10000;
  color: #444;
}

#langWidget img {
  max-width: 100%;
  object-fit: contain;
  border: 1px solid #dddddd;
}

.langSelected {
  display: grid;
  grid-template-columns: auto 30px;
  align-items: center;
  gap: 5px;
  justify-items: end;
}

.langOption {
  position: relative;
  top: 5px;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #ccc;
  height: 0;
  overflow: hidden;
  background: transparent;
}

#langWidget:hover .langOption {
  height: auto;
}

.langFlag {
  display: grid;
  grid-template-columns: 30px auto;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 8px 15px;
}

.langFlag:hover {
  background: transparent;
}
</style>
