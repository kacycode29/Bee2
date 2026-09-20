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
];
