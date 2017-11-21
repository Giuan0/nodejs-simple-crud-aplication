const User = require('./user.model');

exports.create = (user)=>{
    const newUser = new User(user);
    return newUser.save()
	.then(data=>{
		return {data: data, code: 200};
	}).catch(err=>{
		if(err.code == 11000)//email already exists
			return {message: 'email already exists', code: 409};
		return { message: err, code: 400 };
	});
}

exports.login = (email, password)=>{
    return User.findOne({email: email})
    .then(user=>{
        if(!user)
            return { message: "user not found", code: 404 };
        if(user.password !== password)
            return { message: "wrong password", code: 401 };
        return { data: user, code: 200 };
    }).catch(err=>{
        return { message: err.toString(), code: 500 }
    })
}

exports.getById = (userId)=>{
    return User.findOne({_id: userId})
    .then(user=>{
        if(!user)
            return { message: "user not found", code: 404 };
        return { data: user, code: 200 };
    }).catch(err=>{
        return { message: err.toString(), code: 500 }
    })
}

exports.getAll = ()=>{
    return User.find({})
    .then(users=>{
        return { data: users, code: 200 };
    }).catch(err=>{
        return { message: err.toString(), code: 500 }
    })
}

exports.getByEmail = (email)=>{
    return User.findOne({email: email})
    .then(user=>{
        if(!user)
            return { message: "user not found", code: 404 };
        return { data: user, code: 200 };
    }).catch(err=>{
        return { message: err.toString(), code: 500 }
    })
}

exports.putById = (userId, update)=>{
    return User.findOneAndUpdate({ _id: userId }, { $set: update }, { new: true })//the third argument makes the query return the new document
    .then(user=>{
        if(!user)
            return { message: "user not found", code: 404 };
        return { data: user, code: 200 };
    }).catch(err=>{
        return { message: err.toString(), code: 500 }
    })
}

exports.removeById = (userId)=>{
    return User.remove({ _id: userId })
    .then(feedback=>{
        if(feedback.result.n === 0)
            return { message: 'user not found', code: 404 };
        return { data: 'user successfully removed', code: 200 };
    }).catch(err=>{
        return { message: err.toString(), code: 500 }
    })
}