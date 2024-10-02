<template>
  <section class="overflow-hidden bg-slate-300">
  <!-- TODO : Mobile mettre le formulaire en premier -->
    <div class="container px-4 mx-auto pt-16 pb-20">
      <div class="flex flex-wrap -mx-4">
        <!-- Côté gauche -->
        <!-- TODO Ajuster les padding -->
        <div class="w-full lg:w-1/2 p-4">
          <div class="max-w-xl mx-auto gap-5 flex flex-col text-white">
            <div class="bg-secondary p-4 rounded-3xl">
              <h2 class="text-white text-xl font-bold font-heading pb-5">
                Association Rouler pour aider
              </h2>

              <div class="flex flex-nowrap items-start gap-3 mb-4">
                <div class="bg-orange-50 rounded-xl p-2 text-black">
                  <IconsHome />
                </div>
                <p class="text-white">10 rue Jean Jaurès, 60550 Verneuil-en-Halatte</p>
              </div>

              <div class="flex flex-nowrap items-start gap-3 mb-4">
                <div class="bg-orange-50 rounded-xl p-2 text-black">
                  <IconsEmail />
                </div>
                <p class="text-white">roulerpouraider60@gmail.com</p>
              </div>
            </div>

            <!-- Contact Yves Gerard -->
            <div v-for="(contact, index) in contacts"
              class="rounded-3xl bg-primary shadow-sm py-8" >
              <div class="relative">
                <div class="absolute top-0 left-0 bg-orange-50 w-1 h-8"></div>
                <div class="flex flex-col md:flex-row justify-between items-center">
                  <div class="px-8">
                    <h2 class="text-white text-xl font-medium font-heading mb-6">
                      {{ contact.prenom }} {{ contact.nom }}, {{ contact.role }}
                    </h2>
                    <!-- Ajouter sur deux lignes le mail et le numéro, quand on clique dessus on est redirigé vers le mailing ou appel -->
                    <span class="flex flex-row items-end gap-5 text-xl cursor-pointer">
                      <IconsPhone />
                      <a :href="`tel:${contact.telephone}`" class="hover:underline">{{ contact.telephone }}</a>
                    </span>
                    <span class="flex flex-row items-end gap-5 text-xl cursor-pointer">
                      <IconsEmail />
                      <a :href="`mailto:${contact.email}`" class="hover:underline">{{ contact.email }}</a>
                    </span>
                  </div>
                  <!-- Avatar -->
                  <div class="mt-10 md:mt-0 md:pr-8">
                    <img
                      class="w-24 h-24 rounded-full object-cover"
                      :src="contact.contactPhotoUrl"
                      alt="Avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>

        <!-- Côté droit -->
        <div class="w-full lg:w-1/2 p-4">
          <form class="h-full" action="" @submit.prevent>
            <div
              class="h-full border border-gray-100 bg-white rounded-3xl p-6 max-w-xl mx-auto"
            >
              <h2 class="text-3xl text-center font-bold font-heading mb-4">
                Contactez-nous
              </h2>
              <div class="flex flex-wrap -mx-4">
                <div class="w-full lg:w-1/2 p-4">
                  <label class="text-sm font-medium mb-2 block" for="firstName"
                    >Prénom</label
                  >
                  <input
                    class="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
                    v-model="firstName"
                    type="text"
                    placeholder="Prénom"
                  />
                </div>
              </div>
              <label class="text-sm font-medium mb-2 block" for="textInput3">Email</label>
              <input
                class="w-full mb-4 rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
                v-model="email"
                type="email"
                placeholder="john@email.com"
                @blur="validateEmail"
              />
              <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
              <label class="text-sm font-medium mb-2 block" for="textInput4"
                >Message</label
              >
              <textarea
                class="resize-none w-full h-[220px] rounded-3xl p-4 mb-8 outline-none border border-gray-100 placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
                v-model="message"
                rows="5"
                placeholder="Écrivez votre message ici..."
              ></textarea>
              <button
                class="py-4 px-6 rounded-full w-full h-14 inline-flex items-center justify-center text-center mb-8 bg-primary/90 border border-primary font-semibold font-heading text-white hover:bg-primary focus:ring focus:ring-primary transition duration-200"
                @click.prevent="sendEmail"
              >
                Envoyer
              </button>
              <!-- TODO : A adapter -->
              <p class="text-gray-500 text-sm">
                <span>Nous traitons vos données personnelles selon nos </span>
                <span class="text-secondary text-sm font-semibold">mentions légales</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rouler pour aider - Contact',
  ogTitle: 'Rouler pour aider - Contact',
  description: 'Contactez-nous pour plus d\'informations sur notre association. Nous serons ravis de vous répondre.',
  ogDescription: 'Contactez-nous pour plus d\'informations sur notre association. Nous serons ravis de vous répondre.',
  ogImage: 'https://roulerpouraider.fr/images/logoBig_roulerPourAider.png',
})

// import nodemailer from "nodemailer";
const mail = useMail();

const firstName = ref("");
const email = ref("");
const message = ref("");

const sendEmail = async () => {
  const messageBody = `---\nPrénom: ${firstName.value}\nEmail: ${email.value}\n---\n\n${message.value}`;
  try {
    await mail.send({
      from: "",
      subject: "Contact form submission",
      text: messageBody,
    });
    useNuxtApp().$toast.success('Email bien envoyé', {
      theme: 'colored',
      autoClose: 5000,
      type: 'info',
      position: 'bottom-right',
    });
  } catch (error) {
    useNuxtApp().$toast.error("Une erreur s'est produite lors de l'envoi de l'e-mail. Veuillez réessayer.", {
      theme: 'colored',
      autoClose: 5000,
      type: 'info',
      position: 'bottom-right',
    });
  }
};

interface contact {
  contactPhotolUrl: string;
  prenom: string;
  nom: string;
  role: string;
  description: string;
  telephone: string;
  email: string;
}

const contacts = ref<contact[]>([]);

const runtimeConfig = useRuntimeConfig();
const { public: { strapiBaseUrl, strapiToken } } = runtimeConfig;

let emailError = ref("");

const validateEmail = () => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!regex.test(email)) {
    console.log(email);
    emailError = 'Email non valide';
  } else {
    emailError = '';
  }
};

const transformContactObject = (contactData) => {
  return contactData.map((data) => {
    const { image, prenom, nom, telephone, ...otherAttributes } = data.attributes;
    const telephoneString = telephone.toString();
    const telephoneTransformed = `+33 ${telephoneString.charAt(0)} ${telephoneString.slice(1).match(/.{1,2}/g).join(' ')}`;

    let url = image.data.attributes.url;
    let lastPart = url.split("/").pop();

    return {
      ...otherAttributes,
      prenom: capitalizePrenom(prenom),
      nom: nom.toUpperCase(),
      telephone: telephoneTransformed,
      contactPhotoUrl: "/backoffice/" + lastPart,
    };
  });
};

const getContacts = async () => {
  const url = `${strapiBaseUrl}/api/contacts?populate=*`;

  const { data, pending, error } = await useAsyncData("contacts", () => {
      return $fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${strapiToken}`,
        },
      });
    });

  if (!error.value && !pending.value && data.value) {
    contacts.value = transformContactObject(data.value.data);
  } else {
    console.error(error.value);
  }
};

const capitalizePrenom = (prenom: string) => {
  return prenom.charAt(0).toUpperCase() + prenom.slice(1);
};

getContacts();
</script>
