export class Navbar {
  text: string;
  router: string;
  routerid: string;
  constructor(text: string, router: string, routerId: string = 'vacio') {
    this.text = text;
    this.router = router;
    this.routerid = routerId;
  }
}
