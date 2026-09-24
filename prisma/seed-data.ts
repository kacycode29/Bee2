import type { CefrLevel } from "@prisma/client";

export type SeedVocab = { word: string; definition: string };
export type SeedTrueFalse = { statement: string; answer: boolean };

export type SeedText = {
  title: string;
  level: CefrLevel;
  theme: string;
  ageGroup?: string;
  tags: string[];
  body: string;
  vocab: SeedVocab[];
  trueFalse: SeedTrueFalse[];
  questions: string[];
};

export const SEED_TEXTS: SeedText[] = [
  // ---------------- A1 ----------------
  {
    title: "My Family",
    level: "A1",
    theme: "Famille",
    ageGroup: "6e-5e",
    tags: ["famille", "présentation", "vie quotidienne"],
    body: `Hello! My name is Emma. I am eleven years old. I live in a small house with my family.
There are four people in my family: my mother, my father, my little brother and me.

My mother is a teacher. She works at a primary school. My father is a cook. He works in a restaurant in the city centre.
My little brother is six years old. His name is Tom. He likes cars and football.

Every evening, we eat dinner together. On Sundays, we visit my grandparents. I love my family very much.`,
    vocab: [
      { word: "family", definition: "famille" },
      { word: "brother", definition: "frère" },
      { word: "teacher", definition: "enseignant(e)" },
      { word: "restaurant", definition: "restaurant" },
      { word: "grandparents", definition: "grands-parents" },
    ],
    trueFalse: [
      { statement: "Emma is twelve years old.", answer: false },
      { statement: "Emma's mother is a teacher.", answer: true },
      { statement: "Tom likes cars and football.", answer: true },
      { statement: "The family visits the grandparents on Mondays.", answer: false },
    ],
    questions: [
      "How many people are there in Emma's family?",
      "What does Emma's father do?",
      "When does the family visit the grandparents?",
    ],
  },
  {
    title: "A Day at School",
    level: "A1",
    theme: "École",
    ageGroup: "6e-5e",
    tags: ["école", "routine", "vie quotidienne"],
    body: `My name is Leo. I go to school every day from Monday to Friday. School starts at eight thirty.

In the morning, I have Maths and English. I like English because my teacher is very kind.
At midday, I eat lunch in the canteen with my friends. We talk and laugh a lot.

In the afternoon, I have Sport and Art. I love Art because I can draw and paint.
School finishes at four thirty. After school, I do my homework and then I play with my dog.`,
    vocab: [
      { word: "canteen", definition: "cantine" },
      { word: "homework", definition: "devoirs" },
      { word: "kind", definition: "gentil(le)" },
      { word: "draw", definition: "dessiner" },
      { word: "finishes", definition: "se termine" },
    ],
    trueFalse: [
      { statement: "School starts at eight thirty.", answer: true },
      { statement: "Leo has Art in the morning.", answer: false },
      { statement: "Leo eats lunch alone.", answer: false },
      { statement: "Leo plays with his dog after school.", answer: true },
    ],
    questions: [
      "What subjects does Leo have in the morning?",
      "Why does Leo like English?",
      "What does Leo do after school?",
    ],
  },
  {
    title: "My Favourite Animal",
    level: "A1",
    theme: "Animaux",
    ageGroup: "6e-5e",
    tags: ["animaux", "description"],
    body: `My favourite animal is the dolphin. Dolphins live in the sea. They are very intelligent animals.

Dolphins are grey. They have a long nose and a big smile! They can swim very fast.
Dolphins live in groups. A group of dolphins is called a "pod". They talk to each other with sounds.

I saw dolphins on holiday last summer. It was amazing! I want to learn more about the sea and its animals.`,
    vocab: [
      { word: "dolphin", definition: "dauphin" },
      { word: "intelligent", definition: "intelligent(e)" },
      { word: "group", definition: "groupe" },
      { word: "sounds", definition: "sons, bruits" },
      { word: "amazing", definition: "incroyable" },
    ],
    trueFalse: [
      { statement: "Dolphins live in the mountains.", answer: false },
      { statement: "A group of dolphins is called a pod.", answer: true },
      { statement: "Dolphins cannot swim fast.", answer: false },
      { statement: "The writer saw dolphins on holiday.", answer: true },
    ],
    questions: [
      "Where do dolphins live?",
      "What colour are dolphins?",
      "What is a group of dolphins called?",
    ],
  },

  // ---------------- A2 ----------------
  {
    title: "A Trip to London",
    level: "A2",
    theme: "Voyage",
    ageGroup: "4e-3e",
    tags: ["voyage", "villes", "vacances"],
    body: `Last spring, my class went on a school trip to London. We travelled by coach and then by ferry across the sea.
It was a long journey, but we were very excited.

When we arrived, we visited many famous places. We saw Big Ben, the London Eye and Buckingham Palace.
We also went to a museum where we learned about British history.

In the afternoon, we had free time to buy souvenirs for our families. I bought a small red bus for my sister.
In the evening, we ate fish and chips, a traditional British dish. It was delicious!

I really enjoyed the trip. I hope to go back to London one day to practise my English.`,
    vocab: [
      { word: "journey", definition: "trajet, voyage" },
      { word: "famous", definition: "célèbre" },
      { word: "museum", definition: "musée" },
      { word: "souvenirs", definition: "souvenirs (objets)" },
      { word: "traditional", definition: "traditionnel(le)" },
      { word: "delicious", definition: "délicieux" },
    ],
    trueFalse: [
      { statement: "The class travelled to London by plane.", answer: false },
      { statement: "The students saw Big Ben and the London Eye.", answer: true },
      { statement: "The students had no free time.", answer: false },
      { statement: "The writer ate fish and chips in the evening.", answer: true },
    ],
    questions: [
      "How did the class travel to London?",
      "Name two famous places the students visited.",
      "What did the writer buy for her sister?",
    ],
  },
  {
    title: "Healthy Food",
    level: "A2",
    theme: "Santé",
    ageGroup: "4e-3e",
    tags: ["santé", "alimentation"],
    body: `Eating healthy food is important for your body and your mind. Doctors say that we should eat fruit and vegetables every day.

Fruit and vegetables contain vitamins that help our body fight illness. For example, oranges have a lot of vitamin C.
It is also important to drink water instead of sugary drinks like soda.

Fast food, like burgers and chips, is not good if you eat it too often. It contains a lot of fat and sugar.
Instead, you can cook simple and healthy meals at home, like pasta with vegetables or grilled chicken with salad.

Sport is also important. If you eat well and exercise regularly, you will feel more energetic and happy.`,
    vocab: [
      { word: "vitamins", definition: "vitamines" },
      { word: "illness", definition: "maladie" },
      { word: "instead", definition: "à la place" },
      { word: "regularly", definition: "régulièrement" },
      { word: "energetic", definition: "plein(e) d'énergie" },
    ],
    trueFalse: [
      { statement: "Oranges contain a lot of vitamin C.", answer: true },
      { statement: "The text says soda is better than water.", answer: false },
      { statement: "Fast food is good if you eat it every day.", answer: false },
      { statement: "Sport helps you feel more energetic.", answer: true },
    ],
    questions: [
      "Why are fruit and vegetables good for you?",
      "What should you drink instead of sugary drinks?",
      "Give an example of a healthy meal from the text.",
    ],
  },
  {
    title: "My Weekend",
    level: "A2",
    theme: "Loisirs",
    ageGroup: "4e-3e",
    tags: ["loisirs", "temps libre", "routine"],
    body: `On Saturday morning, I usually wake up late because I don't go to school. I have breakfast with my family and then I watch TV for a while.

In the afternoon, I often meet my friends in the park. We play basketball or just talk and laugh together.
Sometimes we go to the cinema to watch a new film.

On Sunday, I help my parents with the housework. Then, in the afternoon, I do my homework for Monday.
In the evening, my family and I often cook a big meal together. It's my favourite moment of the weekend.

I really enjoy my weekends because I can relax and spend time with the people I love.`,
    vocab: [
      { word: "usually", definition: "habituellement" },
      { word: "housework", definition: "tâches ménagères" },
      { word: "relax", definition: "se détendre" },
      { word: "moment", definition: "moment" },
      { word: "together", definition: "ensemble" },
    ],
    trueFalse: [
      { statement: "The writer wakes up early on Saturdays.", answer: false },
      { statement: "The writer meets friends in the park.", answer: true },
      { statement: "The writer never helps with housework.", answer: false },
      { statement: "Cooking together is the writer's favourite moment.", answer: true },
    ],
    questions: [
      "What does the writer do on Saturday afternoon?",
      "What does the writer do on Sunday morning?",
      "Why does the writer enjoy the weekend?",
    ],
  },

  // ---------------- B1 ----------------
  {
    title: "The Rise of Social Media",
    level: "B1",
    theme: "Technologie",
    ageGroup: "Lycée",
    tags: ["technologie", "réseaux sociaux", "société"],
    body: `Over the past fifteen years, social media has completely changed the way people communicate. Platforms like Instagram, TikTok and Snapchat allow users to share photos, videos and opinions with millions of people around the world.

For many teenagers, social media is a normal part of daily life. It helps them stay in touch with friends, discover new music and follow their favourite celebrities. Some young people even use these platforms to learn new skills, such as cooking or coding, through short educational videos.

However, social media also has negative effects. Many experts believe that spending too much time online can affect sleep, concentration and self-esteem, especially when users compare their lives to the "perfect" images they see online. There are also concerns about cyberbullying and the spread of false information.

Because of these risks, some schools now teach digital literacy classes to help students use social media more safely and responsibly. Parents are also encouraged to talk openly with their children about their online activities.

In the end, social media is neither entirely good nor entirely bad. Like any powerful tool, it depends on how we choose to use it.`,
    vocab: [
      { word: "platforms", definition: "plateformes" },
      { word: "celebrities", definition: "célébrités" },
      { word: "self-esteem", definition: "estime de soi" },
      { word: "cyberbullying", definition: "harcèlement en ligne" },
      { word: "literacy", definition: "maîtrise (d'une compétence)" },
      { word: "responsibly", definition: "de manière responsable" },
    ],
    trueFalse: [
      { statement: "Social media has stayed the same for the last fifteen years.", answer: false },
      { statement: "Some teenagers use social media to learn new skills.", answer: true },
      { statement: "The text says social media has no negative effects.", answer: false },
      { statement: "Some schools teach digital literacy classes.", answer: true },
    ],
    questions: [
      "According to the text, why is social media useful for some teenagers?",
      "What negative effects of social media are mentioned?",
      "What are schools and parents doing to address these risks?",
    ],
  },
  {
    title: "Protecting the Environment",
    level: "B1",
    theme: "Environnement",
    ageGroup: "Lycée",
    tags: ["environnement", "écologie", "climat"],
    body: `Climate change is one of the biggest challenges of our time. Scientists agree that human activities, especially burning fossil fuels, are causing the Earth's temperature to rise.

This has serious consequences: more frequent heatwaves, rising sea levels and extreme weather events such as floods and droughts. Many animal species are also losing their natural habitats because of these changes.

Fortunately, there are things that individuals, communities and governments can do to help. On a personal level, people can reduce their use of plastic, recycle more, use public transport instead of cars, and eat less meat.

Governments also play an important role. Many countries are now investing in renewable energy sources, such as solar and wind power, to reduce their dependence on fossil fuels. Some cities have created more cycle lanes and green spaces to encourage a more sustainable lifestyle.

Young people around the world are increasingly getting involved in environmental movements, organising strikes and awareness campaigns. Their message is clear: we all have a responsibility to protect the planet for future generations.`,
    vocab: [
      { word: "fossil fuels", definition: "combustibles fossiles" },
      { word: "heatwaves", definition: "vagues de chaleur" },
      { word: "droughts", definition: "sécheresses" },
      { word: "habitats", definition: "habitats" },
      { word: "renewable", definition: "renouvelable" },
      { word: "sustainable", definition: "durable" },
    ],
    trueFalse: [
      { statement: "Scientists disagree about the causes of climate change.", answer: false },
      { statement: "Rising sea levels are a consequence of climate change.", answer: true },
      { statement: "The text says individuals cannot help fight climate change.", answer: false },
      { statement: "Some young people organise environmental strikes.", answer: true },
    ],
    questions: [
      "What is causing the Earth's temperature to rise, according to the text?",
      "Name two consequences of climate change mentioned in the text.",
      "How are governments trying to reduce dependence on fossil fuels?",
    ],
  },
  {
    title: "Working from Home",
    level: "B1",
    theme: "Travail",
    ageGroup: "Lycée",
    tags: ["travail", "société", "technologie"],
    body: `In recent years, more and more people have started working from home instead of going to an office every day. This change became especially common after the global health crisis of 2020, when many companies had to find new ways of working.

Working from home has several advantages. Employees save time and money because they don't have to travel to work. They can also organise their day more freely and spend more time with their families.

However, this way of working also has some disadvantages. Some people feel isolated because they don't see their colleagues in person. Others find it difficult to separate work time from personal time, which can lead to stress.

Many companies now offer a "hybrid" model, where employees work from home a few days a week and go to the office on other days. This system tries to combine the benefits of both ways of working.

Experts believe that working from home will continue to be popular in the future, especially thanks to new technology that makes online communication easier and more efficient.`,
    vocab: [
      { word: "advantages", definition: "avantages" },
      { word: "isolated", definition: "isolé(e)" },
      { word: "colleagues", definition: "collègues" },
      { word: "separate", definition: "séparer" },
      { word: "hybrid", definition: "hybride" },
      { word: "efficient", definition: "efficace" },
    ],
    trueFalse: [
      { statement: "Working from home became more common after 2020.", answer: true },
      { statement: "The text says working from home has no disadvantages.", answer: false },
      { statement: "Some people feel isolated when working from home.", answer: true },
      { statement: "A hybrid model means working from home every day.", answer: false },
    ],
    questions: [
      "Why did working from home become more common in recent years?",
      "What are two advantages of working from home mentioned in the text?",
      "What is a 'hybrid' model of work?",
    ],
  },

  // ---------------- B2 ----------------
  {
    title: "The Future of Artificial Intelligence",
    level: "B2",
    theme: "Technologie",
    ageGroup: "Lycée",
    tags: ["technologie", "intelligence artificielle", "avenir"],
    body: `Artificial intelligence, or AI, is no longer a concept confined to science fiction films. It has become an integral part of everyday life, from the recommendation algorithms that suggest what to watch next, to the virtual assistants that answer our questions and manage our schedules.

Proponents of AI argue that it has the potential to solve some of humanity's most pressing problems. In medicine, AI systems can already detect certain diseases from scans more accurately than human doctors in some cases. In agriculture, AI-powered tools help farmers optimise water usage and predict crop yields, which could be crucial in addressing food security as the global population grows.

Nevertheless, the rapid development of AI also raises significant concerns. One of the most debated issues is the potential loss of jobs, as machines become capable of performing tasks that were previously carried out by humans, ranging from manufacturing to customer service and even certain aspects of journalism and law.

There are also ethical questions surrounding privacy and bias. AI systems learn from vast amounts of data, and if that data reflects existing societal biases, the resulting algorithms may reproduce or even amplify those biases, whether in hiring decisions, loan approvals or law enforcement.

Governments and international organisations are now working to establish regulatory frameworks that would ensure AI is developed and used responsibly. Striking the right balance between innovation and regulation will likely be one of the defining challenges of the coming decades.

Ultimately, whether artificial intelligence becomes a force for good or a source of new inequalities will depend largely on the choices society makes today.`,
    vocab: [
      { word: "integral", definition: "essentiel(le), à part entière" },
      { word: "proponents", definition: "partisans" },
      { word: "pressing", definition: "urgent(e)" },
      { word: "crop yields", definition: "rendements agricoles" },
      { word: "bias", definition: "biais, parti pris" },
      { word: "regulatory", definition: "réglementaire" },
      { word: "inequalities", definition: "inégalités" },
    ],
    trueFalse: [
      { statement: "AI is described as being limited to science fiction films.", answer: false },
      { statement: "AI can help farmers optimise water usage.", answer: true },
      { statement: "The text says AI raises no ethical concerns.", answer: false },
      { statement: "Governments are working on regulatory frameworks for AI.", answer: true },
    ],
    questions: [
      "According to the text, how can AI be beneficial in medicine and agriculture?",
      "What concerns about AI and employment are raised in the text?",
      "Why can AI systems reproduce societal biases?",
    ],
  },
  {
    title: "Climate Change and Young People",
    level: "B2",
    theme: "Environnement",
    ageGroup: "Lycée",
    tags: ["environnement", "climat", "jeunesse", "engagement"],
    body: `Across the world, young people have become some of the most vocal advocates for climate action. From school strikes to social media campaigns, this generation is demanding that governments and corporations take the climate crisis seriously.

This wave of activism was largely sparked by individual figures who managed to mobilise millions of people internationally. Their message resonated particularly strongly with young people, who feel they will bear the brunt of the consequences of decisions made by previous generations.

Critics sometimes argue that young activists lack the technical expertise to propose realistic solutions, and that their protests disrupt daily life without offering constructive alternatives. Supporters counter that public pressure has historically been essential in driving political change, and that urgency, rather than technical mastery, is precisely what is needed given the scale of the crisis.

Beyond protests, many young people are also taking direct action in their own lives: adopting more sustainable diets, reducing their consumption of fast fashion, and choosing environmentally friendly modes of transport whenever possible. Others are pursuing studies and careers in renewable energy, conservation and environmental policy, hoping to influence change from within these industries.

While it remains to be seen how much concrete political change this movement will achieve, it has undeniably shifted public discourse, placing environmental issues firmly at the centre of political and social debate for the first time in a generation.`,
    vocab: [
      { word: "advocates", definition: "défenseurs, militants" },
      { word: "mobilise", definition: "mobiliser" },
      { word: "bear the brunt", definition: "subir le plus gros des conséquences" },
      { word: "expertise", definition: "expertise" },
      { word: "disrupt", definition: "perturber" },
      { word: "discourse", definition: "discours, débat public" },
    ],
    trueFalse: [
      { statement: "Young people are described as passive about climate change.", answer: false },
      { statement: "Some critics say young activists lack technical expertise.", answer: true },
      { statement: "The text says the activism movement has had no impact on public debate.", answer: false },
      { statement: "Some young people are choosing careers in renewable energy.", answer: true },
    ],
    questions: [
      "Why does the text say young people feel strongly about climate change?",
      "Summarise the arguments of the critics and the supporters of youth climate activism.",
      "What kinds of direct action are young people taking, according to the text?",
    ],
  },
  {
    title: "The Gig Economy",
    level: "B2",
    theme: "Travail",
    ageGroup: "Lycée",
    tags: ["travail", "économie", "société"],
    body: `Over the past decade, the so-called "gig economy" has transformed the way millions of people earn a living. Rather than holding a traditional, permanent job, gig workers take on short-term, flexible tasks, often coordinated through smartphone apps: driving passengers, delivering food, or completing freelance projects for clients around the world.

Supporters of this model highlight its flexibility. Workers can, in theory, choose when and how much they work, which can be particularly appealing to students, parents or people seeking additional income alongside another job. For companies, the gig economy offers a way to scale their workforce up or down depending on demand, without the long-term commitments associated with traditional employment.

However, the gig economy has also attracted considerable criticism. Because gig workers are often classified as independent contractors rather than employees, they typically do not receive benefits such as paid holidays, sick leave or pension contributions. Income can also be unpredictable, and some workers report feeling pressured by algorithms that determine which tasks they are offered.

In response to these concerns, several countries have begun reconsidering the legal status of gig workers, with some court rulings requiring companies to grant them rights closer to those of traditional employees. This ongoing legal and political debate reflects a broader question: how should labour laws, designed decades ago for a different economy, adapt to increasingly digital and flexible forms of work?`,
    vocab: [
      { word: "freelance", definition: "indépendant(e), en free-lance" },
      { word: "workforce", definition: "main-d'œuvre" },
      { word: "contractors", definition: "prestataires, sous-traitants" },
      { word: "pension", definition: "retraite" },
      { word: "unpredictable", definition: "imprévisible" },
      { word: "rulings", definition: "décisions de justice" },
    ],
    trueFalse: [
      { statement: "Gig workers usually have traditional, permanent contracts.", answer: false },
      { statement: "Flexibility is presented as an advantage of the gig economy.", answer: true },
      { statement: "Gig workers always receive the same benefits as employees.", answer: false },
      { statement: "Some court rulings have granted gig workers more rights.", answer: true },
    ],
    questions: [
      "What is the 'gig economy' according to the text?",
      "What advantages of the gig economy are mentioned for workers and companies?",
      "Why are some gig workers unhappy with their status?",
    ],
  },

  // ---------------- C1 ----------------
  {
    title: "The Ethics of Genetic Engineering",
    level: "C1",
    theme: "Sciences",
    ageGroup: "Lycée / prépa",
    tags: ["sciences", "éthique", "biotechnologie"],
    body: `The development of gene-editing technologies, most notably CRISPR-Cas9, has ushered in an era of unprecedented possibility in biology and medicine. Scientists can now edit DNA with a level of precision that was unimaginable a generation ago, opening the door to treatments for previously incurable genetic disorders and raising profound ethical questions in equal measure.

On the therapeutic front, gene editing holds enormous promise. Researchers are already trialling treatments for conditions such as sickle cell disease and certain forms of inherited blindness, in which a faulty gene is corrected directly within a patient's cells. For families affected by rare genetic disorders, such advances represent nothing short of a medical revolution, offering hope where previously there was none.

Yet the same technology that can cure disease could, in principle, be used to modify traits unrelated to health, such as physical appearance or cognitive ability. This possibility, often referred to as "designer babies," has generated considerable unease. Critics warn that if genetic enhancement becomes accessible only to those who can afford it, it could exacerbate existing social inequalities, effectively encoding privilege into the human genome itself.

A further complication arises from the distinction between somatic and germline editing. Somatic modifications affect only the individual treated and are not passed on to future generations, whereas germline editing alters the DNA of embryos, sperm or eggs, meaning the changes would be inherited indefinitely. The latter has been the subject of particular controversy since a Chinese scientist announced, in 2018, that he had created the world's first gene-edited babies — an act widely condemned by the international scientific community as premature and ethically indefensible.

In light of these tensions, many scientific bodies now advocate for robust international governance frameworks, arguing that the extraordinary power of gene editing demands equally extraordinary caution. Whether such frameworks can keep pace with the rapid advancement of the technology itself remains an open, and pressing, question.`,
    vocab: [
      { word: "ushered in", definition: "a marqué le début de" },
      { word: "unprecedented", definition: "sans précédent" },
      { word: "inherited", definition: "héréditaire, hérité(e)" },
      { word: "exacerbate", definition: "aggraver" },
      { word: "somatic", definition: "somatique" },
      { word: "germline", definition: "lignée germinale" },
      { word: "indefensible", definition: "indéfendable" },
    ],
    trueFalse: [
      { statement: "CRISPR-Cas9 allows scientists to edit DNA with great precision.", answer: true },
      { statement: "The text presents gene editing as entirely uncontroversial.", answer: false },
      { statement: "Germline editing only affects the treated individual.", answer: false },
      { statement: "A Chinese scientist's 2018 announcement was widely condemned.", answer: true },
    ],
    questions: [
      "What therapeutic possibilities does gene editing offer, according to the text?",
      "Explain the difference between somatic and germline editing.",
      "Why do some critics worry about genetic enhancement becoming accessible only to the wealthy?",
    ],
  },
  {
    title: "Globalisation and Cultural Identity",
    level: "C1",
    theme: "Culture",
    ageGroup: "Lycée / prépa",
    tags: ["culture", "société", "mondialisation"],
    body: `Globalisation has, over the past few decades, dramatically accelerated the flow of goods, ideas and people across national borders. While this interconnectedness has brought undeniable economic benefits, it has also prompted a wide-ranging debate about its effects on local and national cultural identities.

Proponents of globalisation often point to the cultural enrichment it fosters. Access to international cuisine, music, film and literature has broadened many people's horizons, fostering a sense of shared, global citizenship. Diaspora communities, in particular, have been able to maintain stronger ties to their countries of origin thanks to global communication networks and more affordable international travel.

Critics, however, contend that globalisation frequently results in a homogenisation of culture, whereby dominant, often Western, cultural products crowd out local traditions, languages and artistic forms. The global prevalence of a handful of multinational fast-food chains, entertainment franchises and social media platforms is frequently cited as evidence of this trend. Indigenous languages, in particular, are disappearing at an alarming rate, with linguists estimating that nearly half of the world's roughly seven thousand languages could vanish within this century.

Some scholars propose a more nuanced framework, describing the phenomenon not simply as homogenisation but as "glocalisation" — the adaptation of global products and ideas to local contexts. A well-known fast-food chain, for instance, adjusts its menu considerably depending on the country in which it operates, illustrating how global and local forces can intermingle rather than simply cancel each other out.

Ultimately, whether globalisation constitutes a threat to cultural diversity or an opportunity for cultural exchange may depend less on the phenomenon itself than on the specific policies — regarding language education, cultural funding and media regulation — that individual nations choose to adopt in response to it.`,
    vocab: [
      { word: "interconnectedness", definition: "interconnexion" },
      { word: "fosters", definition: "favorise" },
      { word: "diaspora", definition: "diaspora" },
      { word: "homogenisation", definition: "homogénéisation" },
      { word: "indigenous", definition: "autochtone, indigène" },
      { word: "nuanced", definition: "nuancé(e)" },
    ],
    trueFalse: [
      { statement: "The text presents globalisation as having only positive effects.", answer: false },
      { statement: "Diaspora communities can maintain ties to their home countries more easily today.", answer: true },
      { statement: "Linguists say indigenous languages are at no risk.", answer: false },
      { statement: "'Glocalisation' refers to adapting global products to local contexts.", answer: true },
    ],
    questions: [
      "What cultural benefits of globalisation are mentioned in the text?",
      "Why do critics argue that globalisation leads to cultural homogenisation?",
      "What does the concept of 'glocalisation' suggest about the relationship between global and local culture?",
    ],
  },
  {
    title: "The Psychology of Social Media Addiction",
    level: "C1",
    theme: "Technologie",
    ageGroup: "Lycée / prépa",
    tags: ["technologie", "psychologie", "société"],
    body: `Few technological developments have altered daily human behaviour as profoundly, or as rapidly, as social media. What began as a means of staying in touch with friends and family has, for a significant proportion of users, evolved into something closer to a compulsion — a pattern of use that researchers increasingly describe using the language of addiction.

At the heart of this phenomenon lies the concept of "variable reward," a psychological mechanism long understood by casino designers and now deliberately embedded into the architecture of social media platforms. Unlike a predictable reward, an unpredictable one — will this post receive many likes, or few? — triggers a stronger dopamine response, compelling users to check their notifications repeatedly in pursuit of that uncertain payoff.

This is compounded by the infinite scroll feature, which removes natural stopping cues that might otherwise prompt a user to put down their phone. Combined with algorithms explicitly optimised to maximise engagement — often by surfacing emotionally provocative content — the result is a digital environment meticulously engineered to capture and retain attention, sometimes at the expense of users' wellbeing.

The consequences of excessive use are the subject of ongoing research, but a growing body of evidence links heavy social media use among adolescents to increased rates of anxiety, depression and disrupted sleep patterns, although researchers caution against drawing overly simplistic causal conclusions, given that correlation does not necessarily imply causation, and that pre-existing mental health difficulties may equally lead vulnerable individuals toward heavier use.

In response, a handful of former technology executives have publicly renounced the industry's engagement-driven design philosophy, calling instead for "humane technology" that respects users' time and attention. Whether such calls will meaningfully reshape an industry whose business model depends fundamentally on maximising user engagement remains, for now, an open question.`,
    vocab: [
      { word: "compulsion", definition: "compulsion" },
      { word: "dopamine", definition: "dopamine" },
      { word: "compounded", definition: "aggravé(e), amplifié(e)" },
      { word: "engagement", definition: "engagement, implication (de l'utilisateur)" },
      { word: "adolescents", definition: "adolescents" },
      { word: "renounced", definition: "renoncé à, désavoué" },
    ],
    trueFalse: [
      { statement: "'Variable reward' is a mechanism first used by casino designers.", answer: true },
      { statement: "Infinite scroll helps users stop using an app naturally.", answer: false },
      { statement: "The text claims heavy social media use definitely causes depression.", answer: false },
      { statement: "Some former tech executives now criticise engagement-driven design.", answer: true },
    ],
    questions: [
      "Explain the concept of 'variable reward' and how it applies to social media.",
      "How does the 'infinite scroll' feature affect user behaviour?",
      "Why do researchers caution against simplistic conclusions about social media and mental health?",
    ],
  },

  // ---------------- C2 ----------------
  {
    title: "Artificial Intelligence and the Future of Work",
    level: "C2",
    theme: "Technologie",
    ageGroup: "Prépa / université",
    tags: ["technologie", "économie", "travail", "avenir"],
    body: `Every wave of technological innovation, from the mechanised loom to the assembly line, has provoked anxieties about mass unemployment, and each time, the labour market has, eventually, reconfigured itself around the new technology rather than being annihilated by it. The question now confronting economists, policymakers and workers alike is whether artificial intelligence represents merely the latest iteration of this familiar pattern, or something categorically different.

The case for continuity rests on historical precedent. The introduction of automated teller machines, for instance, did not eliminate the profession of bank teller, as many predicted it would; rather, it reduced the cost of operating a branch, prompting banks to open more branches and redeploy tellers toward more relationship-oriented tasks such as advising customers on loans and investments. Proponents of this view argue that AI will similarly automate discrete tasks rather than entire occupations, freeing workers to focus on those aspects of their jobs that require judgment, creativity and interpersonal skill — qualities that remain, for now, beyond the reach of machines.

The case for discontinuity, however, points to the unprecedented breadth of AI's capabilities. Previous waves of automation primarily displaced manual and routine cognitive labour; large language models and related technologies, by contrast, are increasingly capable of performing tasks long considered the exclusive preserve of highly educated professionals: drafting legal contracts, writing software, diagnosing illnesses from medical imagery, even producing passable journalism. If a technology can, in principle, substitute for cognitive labour across a vast range of occupations simultaneously, the historical analogy to previous technological transitions may simply not hold.

Compounding the uncertainty is the question of timing. Even optimists who believe new jobs will eventually emerge to replace those displaced by AI acknowledge that such transitions have historically unfolded over one or two generations — a timescale that offers little comfort to a worker whose occupation is rendered obsolete within the coming decade. This has prompted renewed interest in policy proposals once considered fringe, from universal basic income to substantially expanded and continuously updated systems of vocational retraining, reflecting a growing consensus that whatever equilibrium eventually emerges, the transition itself is likely to be turbulent, and its costs unevenly distributed across the workforce.

Whether one ultimately finds the optimistic or the pessimistic reading more persuasive, what seems increasingly indisputable is that the coming decades will require a fundamental re-examination of the social contract between workers, employers and the state — one that previous generations, facing less capable and more narrowly applicable technologies, were never obliged to undertake with comparable urgency.`,
    vocab: [
      { word: "annihilated", definition: "anéanti(e)" },
      { word: "precedent", definition: "précédent" },
      { word: "redeploy", definition: "redéployer, réaffecter" },
      { word: "discontinuity", definition: "discontinuité, rupture" },
      { word: "preserve", definition: "domaine réservé, apanage" },
      { word: "obsolete", definition: "obsolète" },
      { word: "vocational", definition: "professionnel(le) (formation)" },
    ],
    trueFalse: [
      { statement: "The text says previous technological waves always caused permanent mass unemployment.", answer: false },
      { statement: "ATMs eventually eliminated the profession of bank teller entirely.", answer: false },
      { statement: "The text argues AI may affect a much broader range of occupations than previous automation.", answer: true },
      { statement: "The text presents universal basic income as a proposal gaining renewed interest.", answer: true },
    ],
    questions: [
      "Summarise the 'case for continuity' regarding AI and employment, using the ATM example.",
      "Why does the text suggest the 'case for discontinuity' might be more serious this time?",
      "What policy responses does the text mention in relation to the uncertainty over timing?",
    ],
  },
  {
    title: "The Paradox of Choice in Modern Consumer Societies",
    level: "C2",
    theme: "Société",
    ageGroup: "Prépa / université",
    tags: ["société", "consommation", "psychologie"],
    body: `Contemporary consumer societies are often characterised by an almost unlimited proliferation of choice: a modest supermarket may stock dozens of varieties of a single product, streaming platforms offer libraries of thousands of films and series, and online retailers present shoppers with an effectively infinite catalogue of options for even the most mundane purchase. Conventional economic theory has long held that more choice is unambiguously beneficial, on the grounds that additional options can only expand, never diminish, a consumer's capacity to find the outcome that best satisfies their preferences.

Psychological research over the past two decades, however, has complicated this assumption considerably. Studies have repeatedly demonstrated that, beyond a certain threshold, additional choice can paradoxically diminish, rather than enhance, both decision-making quality and subsequent satisfaction — a phenomenon now widely referred to as the "paradox of choice." Faced with an overwhelming array of options, consumers frequently experience heightened anxiety during the decision-making process itself, and report greater regret and diminished satisfaction with their eventual selection, even when that selection is, by any objective measure, a perfectly reasonable one.

Several psychological mechanisms have been proposed to account for this effect. One is the heightened opportunity cost associated with any single choice made from a larger set: selecting one option among thirty inevitably means forgoing twenty-nine alternatives, each of which might plausibly have proven superior in some respect, thereby fostering persistent counterfactual rumination. Another is the erosion of what psychologists term "satisficing" — the once-common strategy of selecting the first option that meets one's minimum criteria — in favour of "maximising," an exhaustive and often exhausting search for the objectively optimal choice, a strategy that becomes increasingly untenable as the choice set expands.

These findings carry significant implications well beyond the realm of consumer psychology. Some economists and policymakers have invoked the paradox of choice to justify a degree of architectural intervention in decision-making contexts — so-called "choice architecture" or "nudging" — whereby default options are deliberately curated to steer individuals toward outcomes widely regarded as beneficial, such as automatic enrolment in pension savings schemes, while nonetheless preserving the individual's formal freedom to opt out.

Critics of this approach, however, raise legitimate concerns about paternalism, questioning who is entitled to determine which outcomes are sufficiently beneficial to warrant such architectural nudges, and whether the cumulative effect of pervasive, well-intentioned choice curation might, over time, erode the very capacity for autonomous, effortful decision-making that such interventions ostensibly seek to protect individuals from having to exercise unassisted.`,
    vocab: [
      { word: "proliferation", definition: "prolifération" },
      { word: "unambiguously", definition: "sans ambiguïté" },
      { word: "threshold", definition: "seuil" },
      { word: "rumination", definition: "rumination (mentale)" },
      { word: "satisficing", definition: "stratégie de satisfaction minimale (néologisme psycho.)" },
      { word: "paternalism", definition: "paternalisme" },
      { word: "autonomous", definition: "autonome" },
    ],
    trueFalse: [
      { statement: "Conventional economic theory traditionally assumed more choice is always better.", answer: true },
      { statement: "The text says additional choice always improves decision satisfaction.", answer: false },
      { statement: "'Maximising' means choosing the first option that meets minimum criteria.", answer: false },
      { statement: "Critics of 'nudging' raise concerns about paternalism.", answer: true },
    ],
    questions: [
      "What is the 'paradox of choice', according to the text?",
      "Explain the difference between 'satisficing' and 'maximising'.",
      "What criticisms are raised against 'choice architecture' or 'nudging'?",
    ],
  },
  {
    title: "Climate Migration: A Twenty-First Century Challenge",
    level: "C2",
    theme: "Environnement",
    ageGroup: "Prépa / université",
    tags: ["environnement", "climat", "migration", "géopolitique"],
    body: `As the physical consequences of climate change become increasingly tangible — rising sea levels, prolonged droughts, more frequent and severe storms — a further, less visible consequence has begun to attract growing scholarly and political attention: the displacement of populations forced to abandon regions rendered uninhabitable, or economically unviable, by environmental change.

Estimates of the scale of future climate migration vary considerably, reflecting deep uncertainties in both climate modelling and the complex, often indirect, causal pathways linking environmental change to migration decisions. Displacement is rarely attributable to climate factors alone; rather, environmental stress typically interacts with pre-existing economic, political and social vulnerabilities, complicating any straightforward attempt to isolate "climate migrants" as a discrete category. A farmer whose land becomes increasingly unproductive due to prolonged drought, for example, may migrate for reasons that are simultaneously environmental and economic, rendering the analytical boundary between the two exceedingly difficult to draw with any precision.

This definitional ambiguity carries significant legal consequences. The 1951 Refugee Convention, which remains the primary international legal instrument governing the status of refugees, defines a refugee narrowly, as someone fleeing persecution on specific grounds — grounds that notably exclude environmental degradation. Consequently, individuals displaced primarily by climate factors currently possess no clearly defined status under international law, existing instead in a kind of legal limbo, ineligible for refugee protections yet frequently unable to safely remain in, or return to, their places of origin.

Some scholars and advocacy organisations have called for the negotiation of an entirely new international legal framework specifically addressing climate displacement, though such proposals confront formidable political obstacles, not least the reluctance of wealthier nations — historically responsible for the preponderance of cumulative greenhouse gas emissions — to assume binding legal obligations toward populations displaced by a crisis to which they disproportionately contributed. Others argue for a more incremental approach, advocating instead for the expansion of existing legal categories and bilateral or regional agreements, on the grounds that a comprehensive global treaty is, at present, politically unattainable.

Whichever approach ultimately prevails, the underlying governance challenge is unlikely to diminish. Projections suggesting that climate-related displacement could affect tens, if not hundreds, of millions of people over the coming decades imply that the current legal and institutional vacuum surrounding climate migration constitutes not a peripheral policy gap, but one of the defining humanitarian and geopolitical challenges of the century ahead.`,
    vocab: [
      { word: "displacement", definition: "déplacement (de population)" },
      { word: "uninhabitable", definition: "inhabitable" },
      { word: "discrete", definition: "distinct(e), séparé(e)" },
      { word: "limbo", definition: "limbes, situation intermédiaire non résolue" },
      { word: "preponderance", definition: "part prépondérante" },
      { word: "incremental", definition: "progressif(ve), par étapes" },
      { word: "peripheral", definition: "périphérique, secondaire" },
    ],
    trueFalse: [
      { statement: "The 1951 Refugee Convention explicitly includes environmental degradation as grounds for refugee status.", answer: false },
      { statement: "The text says climate-related displacement is always clearly separable from economic causes.", answer: false },
      { statement: "Wealthier nations are described as historically responsible for most cumulative emissions.", answer: true },
      { statement: "The text presents climate migration as a minor, peripheral policy issue.", answer: false },
    ],
    questions: [
      "Why is it difficult, according to the text, to define someone as a 'climate migrant'?",
      "What legal gap does the text identify regarding people displaced by climate change?",
      "What two different approaches to addressing this legal gap are mentioned in the text?",
    ],
  },
  // ---------------- A1 (additional) ----------------
  {
    title: "My Best Friend",
    level: "A1",
    theme: "Amitié",
    ageGroup: "6e-5e",
    tags: ["amitié", "présentation", "vie quotidienne"],
    body: `Hello! My name is Aïcha. I want to tell you about my best friend. Her name is Fatou.

Fatou is twelve years old, like me. She lives near my house. We walk to school together every morning.

Fatou is very funny and kind. She likes to sing and dance. I like to read books.

On Saturdays, we play together in the garden. Sometimes we do our homework together too. Fatou is a great friend.`,
    vocab: [
      { word: "best friend", definition: "meilleur(e) ami(e)" },
      { word: "kind", definition: "gentil(le)" },
      { word: "funny", definition: "drôle" },
      { word: "garden", definition: "jardin" },
      { word: "together", definition: "ensemble" },
    ],
    trueFalse: [
      { statement: "Fatou is thirteen years old.", answer: false },
      { statement: "Fatou and Aïcha walk to school together.", answer: true },
      { statement: "Fatou likes to read books.", answer: false },
      { statement: "The girls play together on Saturdays.", answer: true },
    ],
    questions: [
      "How old is Fatou?",
      "What does Fatou like to do?",
      "What do the girls do on Saturdays?",
    ],
  },
  {
    title: "At the Market",
    level: "A1",
    theme: "Vie quotidienne",
    ageGroup: "6e-5e",
    tags: ["marché", "famille", "vie quotidienne"],
    body: `Every Saturday morning, I go to the market with my mother. The market is big and noisy. There are many sellers.

We buy vegetables, fruit and fish. My mother likes to buy tomatoes and onions. I like to buy mangoes because they are sweet.

At the market, people talk and laugh. Some sellers sing to sell their food. It is very colourful.

After the market, we go home and cook lunch together. I love market day.`,
    vocab: [
      { word: "market", definition: "marché" },
      { word: "seller", definition: "vendeur / vendeuse" },
      { word: "vegetables", definition: "légumes" },
      { word: "sweet", definition: "sucré(e)" },
      { word: "noisy", definition: "bruyant(e)" },
    ],
    trueFalse: [
      { statement: "The narrator goes to the market on Sundays.", answer: false },
      { statement: "The market is quiet.", answer: false },
      { statement: "The narrator likes mangoes because they are sweet.", answer: true },
      { statement: "They cook lunch together after the market.", answer: true },
    ],
    questions: [
      "When does the narrator go to the market?",
      "What does the mother like to buy?",
      "What happens after the market?",
    ],
  },
  {
    title: "My Favourite Sport",
    level: "A1",
    theme: "Sport",
    ageGroup: "6e-5e",
    tags: ["sport", "football", "loisirs"],
    body: `My favourite sport is football. I play football every day after school with my friends.

We play in a field near my house. There are no real goals, so we use stones. My team has five players.

I am a good runner. I like to score goals. My best friend Ibrahim is the goalkeeper. He is very tall.

On Sundays, we watch football matches on television with my father. Football makes me very happy.`,
    vocab: [
      { word: "favourite", definition: "préféré(e)" },
      { word: "goalkeeper", definition: "gardien de but" },
      { word: "to score a goal", definition: "marquer un but" },
      { word: "field", definition: "terrain" },
      { word: "team", definition: "équipe" },
    ],
    trueFalse: [
      { statement: "The narrator plays football every day after school.", answer: true },
      { statement: "The team uses real goals.", answer: false },
      { statement: "Ibrahim is the goalkeeper.", answer: true },
      { statement: "They watch football on Saturdays.", answer: false },
    ],
    questions: [
      "Who does the narrator play football with?",
      "What does the team use instead of real goals?",
      "What do they do on Sundays?",
    ],
  },
  {
    title: "A Rainy Day",
    level: "A1",
    theme: "Météo",
    ageGroup: "6e-5e",
    tags: ["météo", "famille", "vie quotidienne"],
    body: `Today it is raining. The sky is grey and the wind is strong. I cannot play outside.

I stay at home with my little sister. We watch the rain from the window. The street is empty.

My mother makes hot tea for us. We drink tea and eat bread. Then we play cards together.

In the evening, the rain stops. The sky is clear again. Tomorrow, I hope the sun will shine.`,
    vocab: [
      { word: "rain", definition: "pluie" },
      { word: "sky", definition: "ciel" },
      { word: "wind", definition: "vent" },
      { word: "outside", definition: "dehors" },
      { word: "to hope", definition: "espérer" },
    ],
    trueFalse: [
      { statement: "It is sunny today.", answer: false },
      { statement: "The narrator plays outside all day.", answer: false },
      { statement: "The mother makes hot tea.", answer: true },
      { statement: "The rain stops in the evening.", answer: true },
    ],
    questions: [
      "Why can't the narrator play outside?",
      "What does the family do while it rains?",
      "What does the narrator hope for tomorrow?",
    ],
  },
  // ---------------- A2 (additional) ----------------
  {
    title: "My Village",
    level: "A2",
    theme: "Vie rurale",
    ageGroup: "4e-3e",
    tags: ["village", "famille", "vie quotidienne"],
    body: `I live in a small village in the countryside. About two hundred people live here. Life in my village is calm and simple.

Most families grow their own food. My father grows maize and beans on his farm. My mother sells vegetables at the small market every Wednesday.

There is one primary school in the village, but no secondary school. Older students, like me, travel to the nearest town for lessons. The journey takes about thirty minutes by bicycle.

In the evening, children play together outside until it gets dark. There is no electricity in every house, so many families use candles or lamps at night. I love my village because everyone knows each other and helps each other.`,
    vocab: [
      { word: "countryside", definition: "campagne" },
      { word: "farm", definition: "ferme" },
      { word: "journey", definition: "trajet" },
      { word: "electricity", definition: "électricité" },
      { word: "calm", definition: "calme" },
    ],
    trueFalse: [
      { statement: "About two thousand people live in the village.", answer: false },
      { statement: "The village has both a primary and a secondary school.", answer: false },
      { statement: "The narrator travels to town by bicycle.", answer: true },
      { statement: "Every house in the village has electricity.", answer: false },
    ],
    questions: [
      "What do the narrator's parents do?",
      "Where do older students go for secondary school?",
      "Why does the narrator love the village?",
    ],
  },
  {
    title: "A Birthday Party",
    level: "A2",
    theme: "Fêtes",
    ageGroup: "4e-3e",
    tags: ["anniversaire", "famille", "fêtes"],
    body: `Last Saturday, my sister Aminata had her tenth birthday party. My mother started preparing the food early in the morning.

We invited fifteen children from the neighbourhood. Everyone arrived at three o'clock in the afternoon. They wore their best clothes and brought small gifts.

We played games in the garden, like hide-and-seek and musical chairs. Then we ate rice, chicken and a big chocolate cake. Aminata was very happy when she saw the cake with ten candles.

After the meal, we danced to music for two hours. All the children sang "Happy Birthday" together. It was a wonderful day, and Aminata said it was her best birthday ever.`,
    vocab: [
      { word: "birthday", definition: "anniversaire" },
      { word: "neighbourhood", definition: "quartier" },
      { word: "gift", definition: "cadeau" },
      { word: "candle", definition: "bougie" },
      { word: "wonderful", definition: "merveilleux(se)" },
    ],
    trueFalse: [
      { statement: "Aminata turned ten years old.", answer: true },
      { statement: "Fifty children were invited.", answer: false },
      { statement: "The children played hide-and-seek.", answer: true },
      { statement: "Nobody sang 'Happy Birthday'.", answer: false },
    ],
    questions: [
      "How many children were invited to the party?",
      "What games did the children play?",
      "How did Aminata feel about her birthday?",
    ],
  },
  {
    title: "Learning to Cook",
    level: "A2",
    theme: "Cuisine",
    ageGroup: "4e-3e",
    tags: ["cuisine", "famille", "vie quotidienne"],
    body: `This year, I decided to learn how to cook. My grandmother is an excellent cook, so I asked her to teach me.

Every Sunday, I visit her house and we cook together. First, she taught me how to make rice properly, without burning it. Then she showed me how to prepare a simple tomato sauce with onions, garlic and spices.

Last week, I cooked a whole meal by myself for the first time. I made rice with fish and vegetables. My family said the food tasted delicious, and I felt very proud.

My grandmother says that cooking is not difficult if you are patient and follow the steps carefully. Now I want to learn how to bake bread next.`,
    vocab: [
      { word: "to cook", definition: "cuisiner" },
      { word: "to burn", definition: "brûler" },
      { word: "spices", definition: "épices" },
      { word: "proud", definition: "fier / fière" },
      { word: "patient", definition: "patient(e)" },
    ],
    trueFalse: [
      { statement: "The narrator's grandmother is a bad cook.", answer: false },
      { statement: "They cook together every Sunday.", answer: true },
      { statement: "The narrator has never cooked a whole meal alone.", answer: false },
      { statement: "The narrator wants to learn to bake bread next.", answer: true },
    ],
    questions: [
      "Who is teaching the narrator to cook?",
      "What did the narrator cook alone for the first time?",
      "According to the grandmother, what do you need to cook well?",
    ],
  },
  {
    title: "My Dream Job",
    level: "A2",
    theme: "Métiers",
    ageGroup: "4e-3e",
    tags: ["métiers", "avenir", "école"],
    body: `When I finish school, I want to become a nurse. I have wanted this job since I was eight years old, when a nurse helped my little brother in hospital.

Nurses take care of sick people every day. They give medicine, check patients and comfort families who are worried. It is a difficult job, but also a very important one.

To become a nurse, I need to study hard, especially science subjects like Biology and Chemistry. After secondary school, I will need three more years of training at a nursing school.

My parents support my dream. They say that helping other people is one of the best jobs in the world. I am ready to work hard to achieve my goal.`,
    vocab: [
      { word: "nurse", definition: "infirmier / infirmière" },
      { word: "patient (noun)", definition: "patient(e)" },
      { word: "to comfort", definition: "réconforter" },
      { word: "to achieve", definition: "atteindre, réaliser" },
      { word: "worried", definition: "inquiet / inquiète" },
    ],
    trueFalse: [
      { statement: "The narrator wants to become a doctor.", answer: false },
      { statement: "Nurses only give medicine and do nothing else.", answer: false },
      { statement: "The narrator needs three more years of training after secondary school.", answer: true },
      { statement: "The narrator's parents do not support this dream.", answer: false },
    ],
    questions: [
      "Why does the narrator want to become a nurse?",
      "What subjects does the narrator need to study hard?",
      "How do the narrator's parents feel about this dream?",
    ],
  },
  // ---------------- B1 (additional) ----------------
  {
    title: "The Importance of Reading",
    level: "B1",
    theme: "Éducation",
    ageGroup: "Lycée",
    tags: ["éducation", "lecture", "habitudes"],
    body: `Reading is one of the most valuable habits a person can develop. Beyond helping students perform better at school, reading regularly brings many benefits that last a lifetime.

First, reading improves vocabulary and writing skills. People who read often are usually better at expressing their ideas clearly, both in speech and in writing. Second, books open windows onto different cultures, historical periods and ways of thinking. A novel set in another country can teach a reader more about that place than a textbook ever could.

Reading also has psychological benefits. Studies suggest that reading fiction can increase empathy, because readers imagine themselves in the position of different characters. In addition, many people find reading relaxing; it can reduce stress after a long day.

Unfortunately, in the age of smartphones and social media, many young people read less than previous generations. Teachers and parents increasingly encourage children to set aside time each day for reading, even just twenty minutes, to keep this valuable habit alive.`,
    vocab: [
      { word: "valuable", definition: "précieux(se), utile" },
      { word: "habit", definition: "habitude" },
      { word: "empathy", definition: "empathie" },
      { word: "previous", definition: "précédent(e)" },
      { word: "to encourage", definition: "encourager" },
    ],
    trueFalse: [
      { statement: "Reading only helps students at school and has no other benefits.", answer: false },
      { statement: "Reading fiction may increase empathy, according to studies.", answer: true },
      { statement: "Young people today read more than previous generations.", answer: false },
      { statement: "Teachers encourage children to read at least twenty minutes a day.", answer: true },
    ],
    questions: [
      "According to the text, what two skills does reading improve?",
      "Why might reading fiction increase empathy?",
      "What is one reason young people read less today?",
    ],
  },
  {
    title: "Traditional Festivals in West Africa",
    level: "B1",
    theme: "Culture",
    ageGroup: "Lycée",
    tags: ["culture", "traditions", "fêtes"],
    body: `West Africa is home to a rich variety of traditional festivals, many of which have been celebrated for hundreds of years. These festivals often mark important moments such as harvests, the start of a new year, or the coming of age of young people.

One well-known example is the Yam Festival, celebrated in several countries to give thanks for a good harvest and to honour ancestors. During the festival, communities gather to sing, dance, wear colourful traditional clothes and share large meals featuring yams prepared in different ways.

Masquerade festivals are also common, where performers wear elaborate masks and costumes representing spirits or ancestors. These masquerades are believed to protect the community and bring good fortune for the coming year.

Today, many festivals also attract tourists, who travel to experience the music, dancing and traditional food. While some young people worry that modern life is changing these traditions, festival organisers work hard to teach children the meaning behind each ceremony, so that the culture continues for future generations.`,
    vocab: [
      { word: "harvest", definition: "récolte" },
      { word: "ancestor", definition: "ancêtre" },
      { word: "costume", definition: "costume" },
      { word: "fortune", definition: "chance, fortune" },
      { word: "ceremony", definition: "cérémonie" },
    ],
    trueFalse: [
      { statement: "The Yam Festival celebrates a good harvest.", answer: true },
      { statement: "Masquerade performers wear ordinary clothes.", answer: false },
      { statement: "Festivals attract no tourists at all.", answer: false },
      { statement: "Organisers try to teach children the meaning of the ceremonies.", answer: true },
    ],
    questions: [
      "What does the Yam Festival celebrate?",
      "What do masquerade performers wear, and what do they represent?",
      "Why do festival organisers teach children about these traditions?",
    ],
  },
  {
    title: "Youth Unemployment",
    level: "B1",
    theme: "Emploi des jeunes",
    ageGroup: "Lycée",
    tags: ["travail", "société", "jeunesse"],
    body: `Youth unemployment remains one of the biggest challenges facing many countries today. Millions of young people finish their education every year but struggle to find a stable job.

There are several reasons for this problem. In some places, the education system does not always prepare students with the practical skills that employers need. In other cases, there simply are not enough jobs being created to match the number of young graduates entering the job market.

The consequences of youth unemployment can be serious. Without a steady income, many young people find it difficult to become financially independent, start a family, or plan for the future. Some governments and organisations have created programmes to help, such as vocational training centres and small loans for young entrepreneurs who want to start their own businesses.

Experts agree that solving youth unemployment requires cooperation between governments, schools and businesses. Only by working together can societies create enough good opportunities for the next generation.`,
    vocab: [
      { word: "unemployment", definition: "chômage" },
      { word: "graduate (noun)", definition: "diplômé(e)" },
      { word: "income", definition: "revenu" },
      { word: "entrepreneur", definition: "entrepreneur(e)" },
      { word: "cooperation", definition: "coopération" },
    ],
    trueFalse: [
      { statement: "Youth unemployment is not considered a serious problem today.", answer: false },
      { statement: "One cause mentioned is a mismatch between education and job skills.", answer: true },
      { statement: "Some programmes offer small loans to young entrepreneurs.", answer: true },
      { statement: "The text says only governments can solve this problem alone.", answer: false },
    ],
    questions: [
      "What are two reasons given for youth unemployment?",
      "What consequences can youth unemployment have for young people?",
      "According to the text, how can this problem be solved?",
    ],
  },
  {
    title: "The Benefits of Team Sports",
    level: "B1",
    theme: "Sport",
    ageGroup: "Lycée",
    tags: ["sport", "santé", "école"],
    body: `Playing a team sport, such as football, basketball or volleyball, offers much more than physical exercise. It teaches young people important life skills that can help them both on and off the field.

One major benefit is learning to work with others. In a team, players must communicate, trust their teammates and understand that success depends on everyone's effort, not just one star player. This builds strong social skills that are useful in school, work and family life.

Team sports also teach discipline. Players must attend training regularly, follow the coach's instructions and practise even when they do not feel motivated. Over time, this builds resilience and the ability to handle both winning and losing gracefully.

Finally, team sports are simply good for physical and mental health. Regular exercise reduces stress and improves mood, while being part of a team can reduce feelings of loneliness. For these reasons, many schools now consider team sports an essential part of a young person's education.`,
    vocab: [
      { word: "teammate", definition: "coéquipier / coéquipière" },
      { word: "discipline", definition: "discipline" },
      { word: "resilience", definition: "résilience" },
      { word: "gracefully", definition: "avec grâce, dignement" },
      { word: "loneliness", definition: "solitude" },
    ],
    trueFalse: [
      { statement: "Team sports only provide physical exercise and nothing else.", answer: false },
      { statement: "Success in a team sport depends only on one star player.", answer: false },
      { statement: "Team sports can help build discipline and resilience.", answer: true },
      { statement: "The text says team sports have no effect on mental health.", answer: false },
    ],
    questions: [
      "What social skill do players develop through team sports, according to the text?",
      "How do team sports build discipline?",
      "What are two health benefits of team sports mentioned in the text?",
    ],
  },
  {
    title: "Mobile Money and Everyday Life",
    level: "B1",
    theme: "Économie",
    ageGroup: "Lycée",
    tags: ["économie", "technologie", "vie quotidienne"],
    body: `In the last ten years, mobile money services have transformed the way many people manage their finances, especially in areas where traditional banks are hard to reach.

With a simple mobile phone, users can send money to family members, pay for goods at local shops, and pay bills such as electricity or school fees, without ever visiting a bank. This is especially useful in rural areas, where the nearest bank branch might be hours away.

Mobile money has also helped small business owners. Market sellers and shop owners can accept payments quickly and safely, without handling large amounts of cash, which reduces the risk of theft. Many entrepreneurs have also used mobile money accounts to save small amounts regularly and eventually apply for small loans to grow their businesses.

However, some challenges remain. Not everyone owns a mobile phone or feels comfortable using this technology, and network problems can sometimes prevent transactions. Despite these challenges, mobile money continues to spread quickly, changing how millions of people handle money every day.`,
    vocab: [
      { word: "to transform", definition: "transformer" },
      { word: "rural", definition: "rural(e)" },
      { word: "theft", definition: "vol" },
      { word: "loan", definition: "prêt" },
      { word: "transaction", definition: "transaction" },
    ],
    trueFalse: [
      { statement: "Mobile money requires visiting a bank branch every time.", answer: false },
      { statement: "Mobile money can reduce the risk of theft for shop owners.", answer: true },
      { statement: "Everyone owns a mobile phone and finds the technology easy.", answer: false },
      { statement: "The text says mobile money use is decreasing.", answer: false },
    ],
    questions: [
      "What can users do with mobile money, according to the text?",
      "How has mobile money helped small business owners?",
      "What are two challenges mentioned regarding mobile money?",
    ],
  },
  // ---------------- B2 (additional) ----------------
  {
    title: "The Power of Music Across Cultures",
    level: "B2",
    theme: "Culture",
    ageGroup: "Lycée",
    tags: ["musique", "culture", "mondialisation"],
    body: `Music is often described as a universal language, and there is strong evidence to support this idea. Regardless of where a song originates, from a village drumming ceremony to a symphony orchestra, listeners across different cultures can often recognise basic emotions such as joy, sadness or excitement, even without understanding the lyrics.

Throughout history, music has played a central role in bringing communities together. Traditional songs are used to celebrate harvests, mourn losses, and pass down stories from one generation to the next, long before written language became widespread in many societies. In this sense, music functions as a living archive of a community's history and values.

In recent decades, globalisation and digital streaming platforms have accelerated the exchange of musical styles between cultures. Genres such as Afrobeat, originally rooted in West African rhythms, have gained enormous popularity worldwide, influencing pop music in Europe, the Americas and Asia. Similarly, Western genres like hip-hop have been adapted and blended with local languages and traditions across the African continent, creating entirely new sounds.

This constant exchange raises interesting questions about cultural identity. Some critics worry that globalised music could eventually erase distinct local traditions. Others argue, more optimistically, that this blending strengthens cultural connections and allows unique traditions to reach much wider audiences than ever before.`,
    vocab: [
      { word: "universal", definition: "universel(le)" },
      { word: "to mourn", definition: "pleurer (un deuil)" },
      { word: "archive", definition: "archive" },
      { word: "to accelerate", definition: "accélérer" },
      { word: "to blend", definition: "mélanger, fusionner" },
    ],
    trueFalse: [
      { statement: "Listeners can never recognise emotions in music from unfamiliar cultures.", answer: false },
      { statement: "Traditional songs have historically helped pass down community stories.", answer: true },
      { statement: "Afrobeat has had no influence on music outside Africa.", answer: false },
      { statement: "Some critics worry that globalised music could erase local traditions.", answer: true },
    ],
    questions: [
      "Why is music sometimes called a 'universal language'?",
      "What role has traditional music historically played in communities?",
      "What are the two opposing views mentioned about globalised music?",
    ],
  },
  {
    title: "Urbanisation in African Cities",
    level: "B2",
    theme: "Villes",
    ageGroup: "Lycée",
    tags: ["urbanisation", "société", "environnement"],
    body: `African cities are among the fastest-growing urban areas in the world. Over the coming decades, millions of people are expected to move from rural areas to cities in search of better job opportunities, education and healthcare.

This rapid urbanisation brings both opportunities and serious challenges. On the positive side, cities can offer greater access to schools, hospitals and formal employment than many rural areas can provide. Concentrating people and businesses in urban centres can also boost economic growth, as it becomes easier to build infrastructure and share resources efficiently.

However, many cities are struggling to keep pace with this rapid growth. Housing shortages have led to the expansion of informal settlements, where basic services such as clean water, electricity and sanitation are often unreliable or completely absent. Traffic congestion has also become a major problem in many capital cities, increasing pollution and making daily commutes exhausting for residents.

Urban planners argue that careful, long-term planning is essential to managing this growth sustainably. Investments in public transport, affordable housing and renewable energy could help cities absorb new residents without sacrificing quality of life. Some cities have also begun developing satellite towns nearby, designed to reduce pressure on overcrowded city centres while still offering residents access to urban opportunities.

Without such planning, experts warn that the challenges of urbanisation could outweigh its many potential benefits.`,
    vocab: [
      { word: "urbanisation", definition: "urbanisation" },
      { word: "informal settlement", definition: "quartier informel / bidonville" },
      { word: "sanitation", definition: "assainissement" },
      { word: "congestion", definition: "embouteillage, encombrement" },
      { word: "sustainably", definition: "de manière durable" },
    ],
    trueFalse: [
      { statement: "African cities are among the slowest-growing urban areas in the world.", answer: false },
      { statement: "Informal settlements often lack reliable basic services.", answer: true },
      { statement: "Traffic congestion is described as a minor issue.", answer: false },
      { statement: "Some cities are developing satellite towns to reduce pressure on city centres.", answer: true },
    ],
    questions: [
      "What opportunities does the text say cities can offer compared to rural areas?",
      "What two major challenges of rapid urbanisation are described?",
      "What solution do urban planners suggest for managing city growth?",
    ],
  },
  {
    title: "The Rise of E-Learning",
    level: "B2",
    theme: "Technologie",
    ageGroup: "Lycée",
    tags: ["éducation", "technologie", "école"],
    body: `Over the past decade, e-learning has transformed from a niche option into a mainstream part of education systems around the world. Online courses, video lessons and digital classrooms now allow students to learn subjects ranging from mathematics to foreign languages without ever entering a traditional classroom.

One of the biggest advantages of e-learning is flexibility. Students can often study at their own pace, choosing when and where to complete lessons. This is particularly valuable for people who work while studying, or who live far from schools and universities offering the courses they want to take.

E-learning platforms have also made education more accessible in another sense: cost. Many online courses are cheaper than traditional classroom-based programmes, and some are even offered free of charge, opening opportunities to students who could not otherwise afford further education.

However, e-learning is not without its drawbacks. Not all students have reliable access to computers or stable internet connections, which can create new inequalities rather than solving old ones. Additionally, some students find it harder to stay motivated without the structure and social interaction of a physical classroom, and teachers may find it more difficult to notice when a student is struggling.

As technology continues to improve, many experts believe the future of education will combine both online and in-person learning, taking advantage of the strengths of each approach.`,
    vocab: [
      { word: "niche", definition: "de niche, spécialisé(e)" },
      { word: "flexibility", definition: "flexibilité" },
      { word: "accessible", definition: "accessible" },
      { word: "inequality", definition: "inégalité" },
      { word: "motivated", definition: "motivé(e)" },
    ],
    trueFalse: [
      { statement: "E-learning has remained a niche, rarely-used option.", answer: false },
      { statement: "Flexibility is described as a major advantage of e-learning.", answer: true },
      { statement: "All students have equal access to computers and the internet.", answer: false },
      { statement: "Experts believe the future will likely combine online and in-person learning.", answer: true },
    ],
    questions: [
      "What flexibility does e-learning offer students, according to the text?",
      "How has e-learning made education more accessible in terms of cost?",
      "What two drawbacks of e-learning are mentioned?",
    ],
  },
  {
    title: "Food Security and Agriculture",
    level: "B2",
    theme: "Agriculture",
    ageGroup: "Lycée",
    tags: ["agriculture", "alimentation", "environnement"],
    body: `Food security, meaning reliable access to enough safe and nutritious food, remains a major challenge in many parts of the world. Although global food production has increased significantly over the past century, millions of people still face hunger or malnutrition every year.

Several factors contribute to this problem. Climate change is making weather patterns more unpredictable, causing droughts and floods that can destroy entire harvests. In many regions, farmers also lack access to modern equipment, quality seeds, and fertilisers that could help increase their yields. Poor roads and storage facilities mean that even when crops are successfully harvested, a significant portion can be lost before reaching markets.

To address these challenges, governments and organisations are investing in a variety of solutions. Some programmes focus on training farmers in techniques such as crop rotation and water conservation, which can make farms more resilient to changing weather. Others invest in improving infrastructure, such as roads and storage warehouses, to reduce food waste after harvest.

Technology is also playing a growing role. Mobile applications now allow farmers to check weather forecasts, market prices and farming advice directly from their phones. Some experts argue that combining traditional farming knowledge with modern technology offers the best path towards achieving lasting food security for growing populations.`,
    vocab: [
      { word: "malnutrition", definition: "malnutrition" },
      { word: "drought", definition: "sécheresse" },
      { word: "yield (noun)", definition: "rendement" },
      { word: "crop rotation", definition: "rotation des cultures" },
      { word: "warehouse", definition: "entrepôt" },
    ],
    trueFalse: [
      { statement: "Global food production has decreased over the past century.", answer: false },
      { statement: "Climate change is linked to more unpredictable weather patterns.", answer: true },
      { statement: "Poor storage facilities can cause crops to be lost before reaching markets.", answer: true },
      { statement: "The text says technology plays no role in improving food security.", answer: false },
    ],
    questions: [
      "What factors does the text say contribute to food insecurity?",
      "What kind of training can help make farms more resilient?",
      "How is technology helping farmers, according to the text?",
    ],
  },
  {
    title: "The Debate Over School Uniforms",
    level: "B2",
    theme: "Éducation",
    ageGroup: "Lycée",
    tags: ["éducation", "société", "école"],
    body: `The question of whether students should wear school uniforms has been debated for many years, and opinions remain sharply divided among parents, teachers and students themselves.

Supporters of school uniforms argue that they promote equality among students. When everyone wears the same clothes, differences in family income become less visible, which can reduce bullying related to fashion or brand names. Uniforms are also said to create a stronger sense of school identity and discipline, helping students focus on their studies rather than on what to wear each morning.

On the other hand, critics argue that uniforms limit students' freedom of self-expression. They believe that allowing students to choose their own clothes helps them develop their own identity and creativity from a young age. Some also point out that uniforms can be expensive for families, especially when growing children need new sizes every year, which can actually increase financial pressure rather than reduce inequality.

Research on this topic has produced mixed results. Some studies suggest uniforms slightly improve attendance and behaviour, while others find no significant difference in academic performance. Ultimately, many education experts suggest that the decision should depend on each school's specific context and community values, rather than applying one single rule everywhere.`,
    vocab: [
      { word: "uniform", definition: "uniforme" },
      { word: "bullying", definition: "harcèlement" },
      { word: "self-expression", definition: "expression de soi" },
      { word: "attendance", definition: "assiduité, présence" },
      { word: "context", definition: "contexte" },
    ],
    trueFalse: [
      { statement: "Supporters of uniforms argue they can reduce bullying related to fashion.", answer: true },
      { statement: "Critics say uniforms can be expensive for families.", answer: true },
      { statement: "Research has found uniforms always improve academic performance dramatically.", answer: false },
      { statement: "The text concludes that uniforms should be mandatory in every school.", answer: false },
    ],
    questions: [
      "What argument do supporters of uniforms make about equality?",
      "What is one criticism of school uniforms mentioned in the text?",
      "What do many education experts suggest about this decision?",
    ],
  },
  // ---------------- C1 (additional) ----------------
  {
    title: "The Politics of Language in Multilingual Nations",
    level: "C1",
    theme: "Société",
    ageGroup: "Lycée / prépa",
    tags: ["langue", "société", "histoire"],
    body: `In many countries around the world, particularly those with colonial histories, the choice of an official language is rarely a neutral administrative decision. It is, instead, deeply entangled with questions of identity, power and historical memory.

Consider nations where dozens or even hundreds of indigenous languages coexist alongside a former colonial language, such as English, French or Portuguese. Governments in these contexts face a persistent dilemma. Adopting a single indigenous language as official risks alienating speakers of other local languages and may be perceived as favouring one ethnic group over others. Retaining the former colonial language, meanwhile, offers a degree of linguistic neutrality and international utility, particularly in trade, diplomacy and higher education, but can also be criticised as perpetuating colonial hierarchies, in which fluency in the coloniser's tongue continues to determine access to economic and political opportunity.

This tension plays out concretely in national education systems. In many African nations, for instance, children are taught in a European language from an early age, despite research suggesting that early education delivered in a child's mother tongue tends to produce stronger long-term learning outcomes. Reforming this system, however, requires substantial investment: producing textbooks, training teachers and developing standardised curricula in dozens of languages is an enormously complex and costly undertaking.

Some countries have pursued hybrid models, introducing mother-tongue instruction in early primary years before transitioning to a former colonial language in later schooling. Whether such compromises adequately balance pedagogical effectiveness against practical and political constraints remains a subject of ongoing debate among linguists, policymakers and communities themselves. What is clear is that language policy, far from being a purely technical matter, remains one of the most consequential and contested legacies of the colonial era.`,
    vocab: [
      { word: "entangled", definition: "enchevêtré(e), lié(e) de façon complexe" },
      { word: "to alienate", definition: "aliéner, éloigner" },
      { word: "to perpetuate", definition: "perpétuer" },
      { word: "hierarchy", definition: "hiérarchie" },
      { word: "undertaking", definition: "entreprise, tâche" },
    ],
    trueFalse: [
      { statement: "Choosing an official language is described as a purely neutral, technical decision.", answer: false },
      { statement: "Research is said to suggest mother-tongue early education can produce stronger learning outcomes.", answer: true },
      { statement: "Reforming language policy is described as simple and inexpensive.", answer: false },
      { statement: "Some countries use hybrid models combining mother-tongue and colonial-language instruction.", answer: true },
    ],
    questions: [
      "What dilemma do governments face when choosing an official language, according to the text?",
      "Why might teaching in a former colonial language be criticised, despite its practical advantages?",
      "What compromise have some countries adopted regarding language of instruction?",
    ],
  },
  {
    title: "Space Exploration and National Prestige",
    level: "C1",
    theme: "Sciences",
    ageGroup: "Lycée / prépa",
    tags: ["sciences", "espace", "géopolitique"],
    body: `Since the launch of Sputnik in 1957, space exploration has never been purely a scientific endeavour. It has consistently served as a powerful symbol of national capability, technological sophistication and geopolitical influence, a dynamic that continues to shape space programmes today.

During the Cold War, the so-called Space Race between the United States and the Soviet Union was driven as much by ideological competition as by scientific curiosity. Each milestone, from the first satellite to the first human in orbit and eventually the first Moon landing, was framed domestically and internationally as evidence of a nation's superiority. Scientific achievements became, in effect, instruments of soft power.

This dynamic has not disappeared in the twenty-first century; if anything, it has diversified. A growing number of nations, including India, China and the United Arab Emirates, have developed ambitious space programmes, sending missions to the Moon and Mars. For many of these countries, success in space signals rising global stature and technological maturity to both domestic and international audiences, functioning as a form of national branding.

Critics argue that this prestige-driven framing can distort national priorities, directing substantial public funding toward space missions while pressing terrestrial challenges, such as poverty, healthcare and education, remain underfunded. Proponents counter that space programmes generate valuable scientific knowledge and technological innovation with practical applications well beyond space itself, from satellite communications to medical imaging technologies originally developed for spaceflight.

Whatever position one takes in this debate, it seems clear that as long as space exploration remains a visible marker of national achievement, governments will continue to invest in it for reasons that extend well beyond scientific inquiry alone.`,
    vocab: [
      { word: "endeavour", definition: "entreprise, effort" },
      { word: "geopolitical", definition: "géopolitique" },
      { word: "milestone", definition: "étape clé, jalon" },
      { word: "soft power", definition: "puissance douce (influence non coercitive)" },
      { word: "terrestrial", definition: "terrestre" },
    ],
    trueFalse: [
      { statement: "Space exploration has always been purely a scientific matter, unrelated to politics.", answer: false },
      { statement: "The Space Race was partly driven by ideological competition during the Cold War.", answer: true },
      { statement: "Only the United States and Russia currently run ambitious space programmes.", answer: false },
      { statement: "Critics argue that space spending can divert funds from other pressing needs.", answer: true },
    ],
    questions: [
      "What does the text say space achievements symbolised during the Cold War?",
      "Why might a growing number of nations today invest in space programmes?",
      "What criticism is raised against prestige-driven space spending, and how do proponents respond?",
    ],
  },
  {
    title: "The Gender Pay Gap Debate",
    level: "C1",
    theme: "Société",
    ageGroup: "Lycée / prépa",
    tags: ["société", "économie", "égalité"],
    body: `Despite decades of legislation promoting equal pay, a persistent gap remains between the average earnings of men and women in most economies worldwide. Understanding the causes of this gap, however, requires moving beyond simplistic explanations toward a more nuanced analysis of labour markets.

A portion of the measured pay gap can indeed be attributed to direct discrimination, where women are paid less than men for performing identical work. Numerous controlled studies, including some using identical résumés with only the applicant's name changed, have demonstrated that this form of bias still occurs in hiring and compensation decisions.

However, economists generally agree that a substantial share of the overall gap stems from structural factors rather than direct discrimination alone. Women remain disproportionately represented in lower-paying sectors, such as caregiving and education, while being underrepresented in higher-paying fields like engineering and finance. Additionally, women continue to shoulder a greater share of unpaid domestic and childcare responsibilities in most societies, which frequently interrupts career progression, reduces opportunities for promotion, and limits participation in the workforce during critical early-career years.

Addressing the gender pay gap, therefore, likely requires interventions operating on multiple levels simultaneously. These might include stronger anti-discrimination enforcement, policies supporting shared parental leave to distribute caregiving responsibilities more equitably, transparent salary reporting requirements that make pay disparities harder to conceal, and long-term efforts to encourage greater gender diversity across traditionally segregated professional fields.

Critics of purely legislative solutions argue that deep cultural attitudes about gender roles must also shift for meaningful, lasting change to occur, suggesting that legal reform alone, however necessary, may be insufficient to fully close the gap.`,
    vocab: [
      { word: "legislation", definition: "législation" },
      { word: "nuanced", definition: "nuancé(e)" },
      { word: "disproportionately", definition: "de manière disproportionnée" },
      { word: "disparity", definition: "disparité" },
      { word: "segregated", definition: "ségrégué(e), séparé(e)" },
    ],
    trueFalse: [
      { statement: "The text claims the gender pay gap has been completely eliminated by legislation.", answer: false },
      { statement: "Controlled studies using identical résumés have found evidence of hiring bias.", answer: true },
      { statement: "Women are described as overrepresented in higher-paying fields like engineering.", answer: false },
      { statement: "The text suggests cultural attitudes, not just laws, may need to change.", answer: true },
    ],
    questions: [
      "What evidence does the text mention for direct discrimination in hiring?",
      "What structural factors are said to contribute to the gender pay gap?",
      "What multiple interventions does the text suggest could help address the gap?",
    ],
  },
  {
    title: "Artificial Borders and Their Legacy",
    level: "C1",
    theme: "Histoire",
    ageGroup: "Lycée / prépa",
    tags: ["histoire", "société", "géopolitique"],
    body: `Many of the political borders that define modern nation-states, particularly across Africa and the Middle East, were not drawn by the people who live within them. Instead, they were largely determined during the nineteenth and twentieth centuries by colonial powers, often with limited regard for existing ethnic, linguistic or cultural boundaries.

Perhaps the most frequently cited example is the 1884-85 Berlin Conference, during which European powers negotiated the partition of Africa largely without African representatives present. Borders were frequently drawn using straight lines on maps, based on considerations of European strategic and economic interest rather than the social realities on the ground. As a consequence, numerous ethnic groups found themselves divided across two or more countries, while other borders forced historically distinct and sometimes rival communities into a single, newly created state.

The long-term consequences of these decisions remain visible today. Some scholars argue that artificial borders have contributed to ongoing political instability in various regions, as governments have struggled to build cohesive national identities among populations with limited historical connection to one another. Others caution against overstating this explanation, however, pointing out that internal governance failures, economic mismanagement and external interference have also played significant roles in post-colonial conflicts, and that attributing instability solely to colonial-era borders risks oversimplifying a complex set of causes.

Nevertheless, there is broad agreement that understanding this historical context remains essential for meaningfully engaging with contemporary political challenges in formerly colonised regions. Redrawing these borders is rarely considered a realistic or desirable solution today, given the further disruption it would likely cause, but acknowledging their artificial origins helps explain patterns that might otherwise seem puzzling to outside observers.`,
    vocab: [
      { word: "partition (noun)", definition: "partage, division" },
      { word: "cohesive", definition: "cohérent(e), soudé(e)" },
      { word: "mismanagement", definition: "mauvaise gestion" },
      { word: "to oversimplify", definition: "simplifier à l'excès" },
      { word: "puzzling", definition: "déroutant(e)" },
    ],
    trueFalse: [
      { statement: "Most African borders were drawn by the people living within them.", answer: false },
      { statement: "African representatives were present at the Berlin Conference negotiations.", answer: false },
      { statement: "Some scholars link artificial borders to ongoing political instability.", answer: true },
      { statement: "The text claims colonial borders are the sole cause of all post-colonial conflicts.", answer: false },
    ],
    questions: [
      "What example does the text give of how African borders were determined?",
      "What long-term consequence of artificial borders does the text describe?",
      "What caution do some scholars raise about this explanation?",
    ],
  },
  {
    title: "The Ethics of Data Privacy",
    level: "C1",
    theme: "Technologie",
    ageGroup: "Lycée / prépa",
    tags: ["technologie", "éthique", "société"],
    body: `Every time someone uses a smartphone, browses the internet or makes an online purchase, they generate data. This data, collected and analysed at enormous scale by technology companies, has become one of the most valuable resources of the modern economy, but it raises profound ethical questions that societies are only beginning to fully address.

Companies argue that collecting user data allows them to improve their products, personalise user experiences and offer services free of charge, subsidised by targeted advertising rather than direct payment. From this perspective, data collection represents a reasonable exchange: users receive convenient, often free services in return for allowing companies to use their information.

Critics, however, contend that this framing obscures a significant power imbalance. Most users have limited understanding of exactly what data is collected, how long it is retained, or with which third parties it may be shared. Complex privacy policies, often deliberately written in dense legal language, make genuinely informed consent difficult to achieve in practice. Furthermore, once collected, data can potentially be used in ways users never anticipated or agreed to, from influencing political opinions through targeted advertising to enabling discriminatory pricing based on inferred personal characteristics.

In response to these concerns, several jurisdictions have introduced stricter data protection regulations, granting users greater rights to access, correct or delete their personal information, and requiring clearer consent mechanisms. Enforcement, however, remains inconsistent across different regions, and rapidly evolving technologies, such as artificial intelligence systems trained on vast datasets, continue to outpace existing regulatory frameworks.

Ultimately, resolving the tension between technological innovation and individual privacy rights will likely require sustained cooperation between governments, companies and civil society, rather than a single definitive solution.`,
    vocab: [
      { word: "to subsidise", definition: "subventionner" },
      { word: "to obscure", definition: "dissimuler, occulter" },
      { word: "to retain", definition: "conserver" },
      { word: "consent", definition: "consentement" },
      { word: "jurisdiction", definition: "juridiction" },
    ],
    trueFalse: [
      { statement: "Data collection is described as having no ethical implications at all.", answer: false },
      { statement: "Privacy policies are said to always be written in simple, clear language.", answer: false },
      { statement: "Some jurisdictions have introduced stricter data protection regulations.", answer: true },
      { statement: "The text claims this issue has already been fully and permanently resolved.", answer: false },
    ],
    questions: [
      "What argument do companies make in favour of collecting user data?",
      "What power imbalance do critics highlight regarding data collection?",
      "What response have some jurisdictions taken to address these concerns?",
    ],
  },
  // ---------------- C2 (additional) ----------------
  {
    title: "The Anthropocene and the Limits of Human Control",
    level: "C2",
    theme: "Environnement",
    ageGroup: "Prépa / université",
    tags: ["environnement", "sciences", "philosophie"],
    body: `The term "Anthropocene", though not yet formally adopted as a geological epoch by the International Commission on Stratigraphy, has gained widespread currency among scientists and the public alike as a way of describing the present era, one in which human activity has become the dominant force shaping the Earth's geology, atmosphere and ecosystems. The very existence of such a term marks a striking departure from the assumption, prevalent throughout much of human history, that nature constitutes a vast, largely stable backdrop against which comparatively modest human affairs unfold.

Proponents of the Anthropocene framework argue that it captures something genuinely unprecedented: humanity's activities, from fossil fuel combustion to industrial agriculture and plastic production, now leave measurable, planet-spanning signatures, visible in ice cores, sediment layers and atmospheric composition, that will remain detectable for millennia. This represents, they contend, not merely an intensification of humanity's historical environmental impact but a qualitative shift in the relationship between humanity and the planet it inhabits.

Yet the concept is not without its critics, whose objections extend well beyond narrow disputes over stratigraphic classification. Some scholars argue that framing the current crisis in universal terms, as a shared "human" geological signature, obscures profound disparities in responsibility. The carbon emissions driving climate change, for instance, have been overwhelmingly generated by a comparatively small number of industrialised nations and, within them, by their wealthiest inhabitants, even as the resulting consequences, from rising seas to intensifying droughts, disproportionately burden populations that have contributed least to the problem and possess the fewest resources to adapt. Terms such as "Capitalocene", proposed by some critical theorists, attempt to foreground this asymmetry by locating responsibility more precisely within particular economic and political systems rather than an undifferentiated humanity.

Beyond questions of terminology and blame, the Anthropocene concept raises a deeper and arguably more unsettling philosophical challenge: it suggests that the comforting notion of nature as an external, stable entity that humanity merely inhabits, rather than fundamentally reshapes, may no longer be tenable. If human activity has become a genuinely geological force, then the conventional boundary separating "natural" history from human history begins to dissolve, with consequences that extend well beyond the natural sciences into how societies conceive of responsibility, governance and their own place within planetary systems that they can influence profoundly, but ultimately do not fully control.`,
    vocab: [
      { word: "epoch", definition: "époque, ère" },
      { word: "unprecedented", definition: "sans précédent" },
      { word: "stratigraphic", definition: "stratigraphique" },
      { word: "asymmetry", definition: "asymétrie" },
      { word: "tenable", definition: "tenable, défendable" },
    ],
    trueFalse: [
      { statement: "The Anthropocene has already been formally and universally adopted as an official geological epoch.", answer: false },
      { statement: "Proponents argue human activity now leaves planet-spanning, measurable signatures.", answer: true },
      { statement: "The text states carbon emissions have been generated equally by all nations.", answer: false },
      { statement: "The term 'Capitalocene' is mentioned as an attempt to highlight unequal responsibility.", answer: true },
    ],
    questions: [
      "What striking assumption about nature does the Anthropocene framework challenge, according to the text?",
      "What criticism do some scholars raise about framing the crisis in universal, 'human' terms?",
      "What deeper philosophical challenge does the text say the Anthropocene concept raises?",
    ],
  },
  {
    title: "Meritocracy: Myth or Reality?",
    level: "C2",
    theme: "Société",
    ageGroup: "Prépa / université",
    tags: ["société", "philosophie", "égalité"],
    body: `The ideal of meritocracy, the notion that social and economic rewards should be distributed according to individual talent and effort rather than inherited privilege, occupies a curious position in contemporary political discourse: it is simultaneously among the most widely endorsed principles across the political spectrum and among the most fiercely contested in practice.

On its surface, meritocracy appears unassailable. Few would openly argue that positions of responsibility should be allocated according to birth rather than competence, and the principle underpins much of the legitimising rhetoric surrounding modern institutions, from university admissions to corporate hiring practices, which frequently present themselves as objective arbiters of ability rather than as social gatekeepers.

Closer scrutiny, however, reveals substantial tension between meritocratic ideals and observable social outcomes. Critics point out that the conditions enabling individuals to develop and demonstrate "merit" in the first place, access to quality education, financial stability, social networks and even the less tangible cultural capital that helps individuals navigate elite institutions, are themselves profoundly unequal, and are typically inherited rather than earned. A child born into material comfort and stability, in other words, begins from a starting position that provides a decisive advantage in accumulating precisely the credentials that meritocratic systems then reward as evidence of individual merit, rendering the very notion of a level playing field largely illusory in practice.

Some political philosophers go further still, arguing that meritocracy, even where it functions with reasonable accuracy in identifying genuine talent, carries troubling psychological and social consequences that are frequently overlooked. If success is genuinely earned through merit alone, then, the reasoning implicitly suggests, failure must likewise be attributable primarily to individual deficiency rather than to structural circumstance, a conclusion that can foster corrosive attitudes both toward those who struggle economically and among the successful themselves, who may develop an inflated, ultimately unwarranted sense of having single-handedly earned every advantage they enjoy, with little acknowledgment of the contingent circumstances, unearned privileges and considerable luck that also shaped their trajectories.

Reconciling meritocratic ideals with these structural realities remains an unresolved and perhaps irresolvable tension at the heart of contemporary debates about fairness, opportunity and social mobility, one that shows little sign of yielding to easy institutional fixes.`,
    vocab: [
      { word: "unassailable", definition: "incontestable, inattaquable" },
      { word: "arbiter", definition: "arbitre" },
      { word: "scrutiny", definition: "examen minutieux" },
      { word: "credential", definition: "qualification, diplôme" },
      { word: "corrosive", definition: "corrosif(ve), délétère" },
    ],
    trueFalse: [
      { statement: "Meritocracy is described as a principle almost nobody publicly endorses.", answer: false },
      { statement: "The text argues the conditions enabling 'merit' are often unequally inherited.", answer: true },
      { statement: "The text claims a level playing field exists in practice for developing merit.", answer: false },
      { statement: "Some philosophers argue meritocracy can foster harmful attitudes toward those who struggle.", answer: true },
    ],
    questions: [
      "Why does the text describe meritocracy as widely endorsed yet fiercely contested?",
      "What factors does the text say unequally shape a person's ability to demonstrate 'merit'?",
      "What psychological consequence of meritocratic belief do some philosophers highlight?",
    ],
  },
  {
    title: "The Attention Economy and Cognitive Autonomy",
    level: "C2",
    theme: "Technologie",
    ageGroup: "Prépa / université",
    tags: ["technologie", "psychologie", "société"],
    body: `Contemporary digital platforms operate within what scholars increasingly term the "attention economy", an economic model in which human attention itself, rather than any physical product, constitutes the primary commodity being captured, measured and ultimately sold, typically to advertisers seeking access to engaged audiences.

This economic logic has profound implications for platform design. Since revenue scales directly with the amount of time and engagement a platform can extract from its users, companies possess strong structural incentives to design systems that maximise engagement, often through mechanisms explicitly informed by behavioural psychology: variable reward schedules reminiscent of gambling mechanics, algorithmically curated content feeds optimised for emotional engagement rather than informational value, and notification systems engineered to interrupt attention at psychologically opportune moments, all calibrated less toward user wellbeing than toward maximising the time users spend engaged with the platform.

Critics argue that this dynamic raises questions extending well beyond simple concerns about excessive screen time or individual self-control. If platforms are deliberately engineered by teams of engineers and psychologists specifically to exploit predictable cognitive vulnerabilities, the argument runs, then framing the resulting patterns of compulsive engagement primarily as a matter of individual willpower or personal responsibility may fundamentally misdiagnose the nature of the problem, much as blaming individual consumers exclusively for obesity while ignoring the deliberate engineering of hyper-palatable, heavily marketed foods would misdiagnose the structural dimensions of that comparable public health challenge.

Some theorists frame this concern in terms of cognitive autonomy: the capacity of individuals to direct their own attention, thoughts and time according to their own considered values and goals, rather than having these faculties systematically shaped and redirected by external commercial interests operating largely outside conscious awareness. From this perspective, sustained exposure to attention-capturing systems designed by sophisticated teams with access to vast behavioural data may gradually erode an individual's capacity for the sustained, undistracted concentration that activities such as deep reading, complex reasoning and creative work typically require, with consequences that remain difficult to measure with precision but are increasingly the subject of serious scholarly and public concern.

Addressing these concerns meaningfully, proponents of stronger regulation argue, will likely require intervention beyond individual behavioural changes alone, potentially including design regulations, algorithmic transparency requirements, and a broader reconsideration of the underlying economic incentives that currently reward the capture of attention above nearly all other considerations, however genuinely valuable those other considerations might be to users themselves.`,
    vocab: [
      { word: "commodity", definition: "marchandise, produit" },
      { word: "incentive", definition: "incitation, motivation" },
      { word: "opportune", definition: "opportun(e)" },
      { word: "compulsive", definition: "compulsif(ve)" },
      { word: "to erode", definition: "éroder" },
    ],
    trueFalse: [
      { statement: "In the attention economy, human attention itself is described as a commodity.", answer: true },
      { statement: "The text claims platforms have no incentive to maximise user engagement.", answer: false },
      { statement: "The obesity comparison is used to question purely individual explanations of the problem.", answer: true },
      { statement: "The text concludes that individual willpower alone is sufficient to solve this issue.", answer: false },
    ],
    questions: [
      "What is the 'attention economy', as defined in the text?",
      "What design mechanisms does the text mention as being used to maximise engagement?",
      "What is 'cognitive autonomy', and why do some theorists believe it is threatened?",
    ],
  },
  {
    title: "Postcolonial Identity and the Politics of Memory",
    level: "C2",
    theme: "Culture",
    ageGroup: "Prépa / université",
    tags: ["histoire", "culture", "société"],
    body: `For societies emerging from colonial rule, the process of constructing a coherent national identity is rarely a straightforward return to some imagined pre-colonial authenticity. Rather, it typically involves a complex, often contested negotiation between multiple, sometimes competing, layers of historical experience: indigenous traditions disrupted but not entirely erased by colonisation, the undeniable material and institutional legacies left by colonial administrations, and the lived realities of contemporary, often deeply globalised societies that cannot simply be wished away in pursuit of cultural purity.

This tension manifests concretely in debates over collective memory and its public representation. Should national museums and monuments primarily celebrate pre-colonial achievements, emphasising continuity with a past that colonialism sought, often violently, to interrupt or erase? Should they instead foreground the resistance movements and anti-colonial struggles that ultimately secured independence, framing national identity substantially around the act of liberation itself? Or should postcolonial societies engage more directly and explicitly with the colonial period's undeniable complexities, acknowledging both its manifest injustices and the ways in which contemporary institutions, languages and even national borders remain, for better or worse, shaped by that same disputed history?

Scholars of memory studies argue that how societies answer these questions carries substantial contemporary political weight, extending well beyond mere historical curiosity or academic interest. Memory, in this view, is never simply a neutral, objective record of what occurred; it is actively and continuously constructed, contested and reconstructed to serve present purposes, whether legitimising current political arrangements, mobilising particular constituencies, or articulating aspirations for a still-unrealised future. A national narrative emphasising unbroken indigenous continuity, for instance, may serve to unify diverse populations around a shared, if partly idealised, heritage, but risks obscuring the genuine internal diversity, historical conflicts and power imbalances that existed within societies long before colonisation ever began.

Conversely, a narrative constructed too heavily around colonial victimhood, however historically grounded and justified in its own terms, risks inadvertently defining a nation's identity primarily in relation to its former coloniser, potentially constraining rather than expanding the imaginative space available for envisioning genuinely self-determined, forward-looking national futures. Navigating between these considerable risks, without denying either the reality of indigenous heritage or the undeniable, lasting impact of colonial rule, remains one of the central and ongoing challenges facing postcolonial nation-building efforts well into the twenty-first century.`,
    vocab: [
      { word: "coherent", definition: "cohérent(e)" },
      { word: "authenticity", definition: "authenticité" },
      { word: "manifest (adjective)", definition: "manifeste, évident(e)" },
      { word: "constituency", definition: "électorat, groupe de soutien" },
      { word: "inadvertently", definition: "par inadvertance, involontairement" },
    ],
    trueFalse: [
      { statement: "Constructing postcolonial identity is described as a simple return to a pure pre-colonial past.", answer: false },
      { statement: "The text presents multiple, sometimes competing, approaches to representing collective memory.", answer: true },
      { statement: "Memory is described as a neutral, unchanging record of past events.", answer: false },
      { statement: "The text argues that overemphasising colonial victimhood carries no risks at all.", answer: false },
    ],
    questions: [
      "What three layers of historical experience does the text say postcolonial identity must negotiate?",
      "What different approaches to public memory (museums, monuments) does the text describe?",
      "What risk does the text associate with a national narrative built too heavily around colonial victimhood?",
    ],
  },
];
