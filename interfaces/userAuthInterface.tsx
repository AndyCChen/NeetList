import { User } from '@supabase/supabase-js'

export interface UserAuthContextInterface {
   user: User | null | undefined,
}