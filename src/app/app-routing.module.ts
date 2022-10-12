import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './helper/auth-guard.service';
import { IndexComponent } from './layout/index/index.component';
import { AddPostComponent } from './user/add-post/add-post.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'main', component:IndexComponent, canActivate:[AuthGuardService]},
  {path:'', redirectTo:'main', pathMatch:'full'},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuardService], children: [
    {path:'add', component:AddPostComponent, canActivate:[AuthGuardService]},
    {path:'', component:UserPostsComponent, canActivate:[AuthGuardService]}]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
