import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOkResponse({type: User, isArray: true})
    @ApiQuery({name: 'name', required: false})
    @Get()
    getUsers(@Query('name') name: string): User[]{
        return this.usersService.findAll();
    }
    @ApiOkResponse({type: User, description: "The user description"})
    @Get(':id')
    getUserById(@Param('id') id: string): User{
         const user = this.usersService.findById(Number(id));
        if(!user){
            throw new NotFoundException();
        }

        return user;
    
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: CreateUserDto) : User{
        return this.usersService.createUser(body);
    }

}
