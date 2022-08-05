import AppBar from '../components/appBar/AppBar'

type Props = {
   children: React.ReactNode
}

const Layout = ({ children }: Props) => {
   return (
      <div>
         <AppBar />
         <main>
            {children}
         </main>
      </div>
   )
}

export default Layout