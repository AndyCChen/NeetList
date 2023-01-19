import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supaBase";

export const useUser = () => {
	const [user, setUser] = useState<User | null | undefined>();
   const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
      supabase.auth.onAuthStateChange((event, session) => {
         if (!session?.user) setUser(null);

         if (event == 'SIGNED_IN' || event == 'SIGNED_OUT') {
            setUser(session?.user);
         }
      })
      setIsLoading(false);
	}, []);

   return {
      user: user,
      isLoading: isLoading,
   };
}