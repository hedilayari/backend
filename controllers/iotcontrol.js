const iotmodel=require('../models/iotmodel');
const { all } = require('../routers/iotrouter');




  const getallvalue = async (req, res) => {
    try {
      const result = await iotmodel
        .aggregate([
          {
            $group: {
              _id: "$timestamp",
              doc: { $first: "$$ROOT" }
            }
          },
          {
            $project: {
              _id: 0,
              hum: "$doc.hum",
              temp: "$doc.temp",
              poid: "$doc.poid",
              latitude: "$doc.latitude",
              longitude: "$doc.longitude",
              analog : "$doc.analog",
              timestamp: "$doc.timestamp"
            }
          },
          {
            $sort: {
              timestamp: -1
            }
          },
         
        ])
        .exec();
  
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Une erreur est survenue lors de la récupération des valeurs.');
    }
  };
  const getMonthlyAverage = async (req, res) => {
    try {
      const data = await iotmodel
        .find({}, { hum: 1, temp: 1, poid: 1, latitude: 1, longitude: 1, timestamp: 1 })
        .sort({ timestamp: -1 })
        .exec();
  
      const moyennes = {};
  
      // Boucle sur les données
      for (const item of data) {
        const mois = item.timestamp.toISOString().slice(0, 7); // Récupère l'année et le mois (ex: '2023-01')
        const values = [item.hum, item.temp, item.poid]; // Ajoutez d'autres valeurs si nécessaire
  
        // Vérifie si le mois existe déjà dans l'objet moyennes
        if (moyennes[mois]) {
          for (let i = 0; i < values.length; i++) {
            moyennes[mois][i] += values[i];
          }
          moyennes[mois].count++;
        } else {
          moyennes[mois] = [...values];
          moyennes[mois].count = 1;
        }
      }
  
      // Calcule la moyenne pour chaque mois
      for (const mois in moyennes) {
        for (let i = 0; i < moyennes[mois].length; i++) {
          moyennes[mois][i] /= moyennes[mois].count;
        }
      }
  
      // Crée un tableau avec les labels et les données moyennes
      const result = [];
      for (const mois in moyennes) {
        result.push({
          mois,
          hum: moyennes[mois][0],
          temp: moyennes[mois][1],
          poid: moyennes[mois][2]
        });
      }
  
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  };
  
  
exports.getMonthlyAverage=getMonthlyAverage;
exports.getallvalue=getallvalue;