import '../styles/components/Header.scss'
import Place from './place'
import Search from './search'
import Settings from './settings'

function Header(){
    return(
        <div className="Header">
            <Place />
            <Search />
            <Settings />
        </div>
        
    )
}

export default Header