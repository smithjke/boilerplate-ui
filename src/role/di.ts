import { getDependency } from '~/1st-di';
import { RoleService } from './services';

export const useRoleService = () => getDependency<RoleService>('ROLE_SERVICE');
