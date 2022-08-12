const fs = require("fs");

const result = {
  P: {
    2019: 37500,
    2020: 43500,
    2021: 49000,
    2022: 56500,
  },
  Q: {
    2019: 355,
    2020: 425,
    2021: 475,
    2022: 512,
  },
};

function getIA(tahunAsal, tahunN) {
  const priceTahunAsal = result["P"][tahunAsal];
  const priceTahunN = result["P"][tahunN];

  const divide = priceTahunN / priceTahunAsal;

  return {
    rumus: `  ${priceTahunN}\n=  ${Array.from({
      length: String(priceTahunN).length + 2,
    })
      .fill("-")
      .join("")} x 100%\n\    ${priceTahunAsal}\n\n=  ${divide} x 100%`,
    result: divide * 100,
  };
}

function getIL(tahunAsal, tahunN) {
  const priceTahunAsal = result["P"][tahunAsal];
  const priceTahunN = result["P"][tahunN];

  const quantityAsal = result["Q"][tahunAsal];

  const divide = (priceTahunN * quantityAsal) / (priceTahunAsal * quantityAsal);

  return {
    rumus: `  ${priceTahunN} . ${quantityAsal}\n=  ${Array.from({
      length: String(priceTahunN).length + String(quantityAsal).length + 5,
    })
      .fill("-")
      .join(
        ""
      )} x 100%\n\    ${priceTahunAsal} . ${quantityAsal}\n\n=  ${divide} x 100%`,
    result: divide * 100,
  };
}

function getIP(tahunAsal, tahunN) {
  const priceTahunAsal = result["P"][tahunAsal];
  const priceTahunN = result["P"][tahunN];

  const quantityN = result["Q"][tahunN];

  const divide = (priceTahunN * quantityN) / (priceTahunAsal * quantityN);

  return {
    rumus: `  ${priceTahunN} . ${quantityN}\n=  ${Array.from({
      length: String(priceTahunN).length + String(quantityN).length + 5,
    })
      .fill("-")
      .join(
        ""
      )} x 100%\n\    ${priceTahunAsal} . ${quantityN}\n\n=  ${divide} x 100%`,
    result: divide * 100,
  };
}

const soal = [
  ["2019", "2022"],
  ["2019", "2021"],
  ["2020", "2022"],
  ["2021", "2022"],
  ["2020", "2021"],
  ["2019", "2020"],
];

const remap = soal.map((years) => {
  const IA = getIA(years[0], years[1]);
  const IL = getIL(years[0], years[1]);
  const IP = getIP(years[0], years[1]);

  return `${years.join(" - ")}

ΣPn = ${result["P"][years[1]]}
ΣP0 = ${result["P"][years[0]]}
ΣQn = ${result["Q"][years[1]]}
ΣQ0 = ${result["Q"][years[0]]}

IA:
  ${IA.rumus}

=  ${IA.result}%

=  ${Math.round(IA.result)}%

IL:
  ${IL.rumus}

=  ${IL.result}%

=  ${Math.round(IL.result)}%
  
IP:
  ${IP.rumus}

=  ${IP.result}%

=  ${Math.round(IP.result)}%`;
});

const txt = remap.join("\n\n\n\n\n");

fs.writeFileSync("./result.txt", txt);
