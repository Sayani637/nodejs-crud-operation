const express = require('express')
const router = express.Router()
const Person = require('./../models/person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// Post method to create the person
router.post('/signup', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data)
    const response = await newPerson.save()
    console.log('Data Saved:', response)

    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log('Token is : ', token);
    res.status(200).json({response: response, token: token});
  } 
  catch (err) {
    console.error('Error saving data:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Login Route
router.post('/login', async(req, res) => {
   try {
      // Extract username and passowrd from request body
      const {username, password} = req.body;
      // Find the user by username
      const user = await Person.findOne({username: username});
      // If user does not exist or password does not match
      if( !user || !(await user.comparePassword(password))){
        return res.status(401).json({error: 'Invalid username or password'});
      }

      // Generate Token
      const payload = {
        id : user.id,
        username: user.username
      }
      const token = generateToken(payload);
      // Return token as response
      res.json({token})
   } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error'});
   }
})

// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
   try {
    const userData = req.user;
    console.log('User data: ', userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({user});
   } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server error'});
   }
})

// Get method to get the person
router.get('/', jwtAuthMiddleware, async (req, res) => {
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
