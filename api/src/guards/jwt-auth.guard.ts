import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) return false;
    
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
      req.user = payload;
      // @ts-ignore
      req.userRole = payload.db_role || payload.role || 'authenticated';
      req.accessToken = token;

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
