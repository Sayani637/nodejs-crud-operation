const express = require('express')
const router = express.Router()
const Person = require('./../models/person')

// Post method to create the person
router.post('/post', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data)
    const response = await newPerson.save()
    console.log('Data Saved:', response)
    res.status(200).json(response)
  } catch (err) {
    console.error('Error saving data:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Get method to get the person
router.get('/getpost', async (req, res) => {
  try {
    const data = await Person.find()
    console.log('Data Fetched')
    res.status(200).json(data)
  } catch (err) {
    console.error('Error saving data:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/getwork/:workType', async (req, res) => {
  try {
    const workType = req.params.workType
    console.log('workk=============>', workType)
    if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
      const response = await Person.find({ work: workType })
      res.status(200).json(response)
      console.log('response fetch', response)
    } else {
      res.status(404).json({ error: 'Invalid work type' })
    }
  } catch (err) {
    console.error('Error saving data:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// For Get perticuar one person
router.get('/getpost/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('id=======?', id)
    const data = await Person.findOne({ _id: id })
    console.log('data=======?', data)
    res.status(200).json(data)
  } catch (error) {
    console.error('Error saving data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// For Update
router.put('/update/:id',async(req,res)=>{
    try {
      const {id} = req.params 
      const data = req.body  
      console.log('id=======?',id)
     const updateddata = await Person.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
     })
     console.log('data=======?',updateddata)
     res.status(200).json(updateddata)
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })

  // For Delete
router.delete('/delete/:id',async(req,res)=>{
    try {
      const {id} = req.params 
      console.log('id=======?',id)
     const deleteddata = await Person.deleteOne({_id:id})
     console.log('data=======?',deleteddata)
     res.status(200).json({"message":"data deleted"})
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })

module.exports = router
