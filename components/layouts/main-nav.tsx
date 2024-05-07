import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { HeroCheckbox } from '../hero/switcher-hero'
import ThemeToggle from '../theme-toggle'

// import ThemeToggle from "./theme-toggle";

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-11 cursor-pointer px-0 data-[state=open]:bg-background "
        >
          <Icons.menu className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" w-52">
        {/* <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
           
              <span>Credits</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
           
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
         
                  <span>Message</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

         
        </DropdownMenuGroup> */}
        <HeroCheckbox />
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center justify-between"
            href={siteConfig.links.github}
            target="_blank"
          >
            <span>Github</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex items-center justify-between"
            href={siteConfig.links.portfolio}
            target="_blank"
          >
            <span>Portfolio</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
