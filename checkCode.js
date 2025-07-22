let codes = {
    ospite123: { limit: 5, used: 0 },
    staff01: { limit: Infinity, used: 0 },
    startora777: { limit: 1, used: 0 },
    restart777: { limit: 1, used: 0 },
    SONOUNOSPITE: { limit: 3, used: 0 }
  };
  
  export default function handler(req, res) {
    const { code } = req.query;
    if (!codes[code]) return res.status(400).send('Codice non valido');
  
    if (code === 'restart777') {
      for (let c in codes) codes[c].used = 0;
      return res.send('Contatori resettati!');
    }
  
    if (code === 'startora777') {
      global.startTime = Date.now();
      return res.send('Timer di 2 ore avviato!');
    }
  
    if (code === 'SONOUNOSPITE') {
      if (codes[code].used >= 3) return res.send('Codice esaurito');
    }
  
    if (Date.now() - (global.startTime || 0) >= 2 * 60 * 60 * 1000) {
      for (let c in codes) codes[c].used = 0;
      global.startTime = Date.now();
    }
  
    if (codes[code].used < codes[code].limit) {
      codes[code].used++;
      return res.send('Codice valido, attivazione OK!');
    } else {
      return res.send('Hai superato il limite!');
    }
  }