export const img = [
    " https://icongr.am/devicon/android-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/css3-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/gitlab-original-wordmark.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/go-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/javascript-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/nodejs-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/sequelize-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/visualstudio-plain.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/windows8-original.svg?size=100&color=currentColor",
    "https://icongr.am/devicon/react-original.svg?size=100&color=currentColor",
].flatMap((image) => [`a|${image}`, `b|${image}`]
).sort(() => Math.random() - 0.5);
