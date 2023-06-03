const Resource = require('../models/resource');

// Kontroler dla endpointów zasobów
exports.getAllResources = (req, res) => { //pobranie wszystkich zasobów z bazy danych 
  Resource.find()
    .then(resources => {
      res.json(resources);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.getResourceById = (req, res) => { // pobranie zasobów o określonym identyfikatorze 
  const resourceId = req.params.id;

  Resource.findById(resourceId) // wyszukiwanie zasobów -> metoda findById()
    .then(resource => {
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.json(resource);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.createResource = (req, res) => { // tworzenie nowych zasobów 
  const { name, description } = req.body;

  const newResource = new Resource({
    name,
    description
  });

  newResource.save() // zapisanie nowych zasobów 
    .then(savedResource => {
      res.json(savedResource);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

exports.updateResource = (req, res) => { // aktualizacja zasobów 
  const resourceId = req.params.id;
  const { name, description } = req.body;

  Resource.findByIdAndUpdate(resourceId, { name, description }, { new: true }) // wyszukanie po ID i zapisanie nowych danych
    .then(updatedResource => {
      if (!updatedResource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.json(updatedResource);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};
 
exports.deleteResource = (req, res) => { // usuwanie danego zasobu wyszukanego po ID 
  const resourceId = req.params.id;

  Resource.findByIdAndRemove(resourceId) // wyszukanie po ID i usuniecie 
    .then(deletedResource => {
      if (!deletedResource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      res.json({ message: 'Resource deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

// ------ KOTROLERY DLA POSZCZEGÓLNYCH ENDPOINTÓW ------