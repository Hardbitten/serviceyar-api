export default function Responser(resp) {
  const Enum = { data: {}, status: true,statusCode : 200 , devMsg: "", message: "", ...resp };
  const response = this;
  return response.send(Enum);
}

function test() {
  test2().bind()(tes)
}
function test2(test){

}