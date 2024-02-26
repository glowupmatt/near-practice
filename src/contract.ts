// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, initialize, UnorderedMap, Vector, LookupSet } from 'near-sdk-js'
import { assert } from './utils'

const ONE_NEAR = BigInt("1000000000000000000000000");


@NearBindgen({})
class HelloNear {
  greeting: string = "Hello";

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.greeting;
  }

  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ greeting }: { greeting: string }): void {
    near.log(`Saving greeting ${greeting}`);
    this.greeting = greeting;
  }

}

@NearBindgen({ requireInit: true })
class DonationContract {
  beneficiary: string = "";
  donations = new UnorderedMap<bigint>('map-uid-1');

  @initialize({ privateFunction: true })
  init({ beneficiary }: { beneficiary: string }) {
    this.beneficiary = beneficiary
  }
}
