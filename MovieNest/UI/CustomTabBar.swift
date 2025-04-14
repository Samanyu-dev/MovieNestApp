
import SwiftUI

struct CustomTabBar: View {
    @Binding var currentTab: Tab
    
    var backgroundColors = [Color("orange"), Color("red"), Color("black")]
    
    var body: some View {
        VStack{
            HStack(spacing: 45) {
                ForEach(Tab.allCases, id: \.self) { tab in
                    Button {
                        withAnimation(.easeInOut) {
                            currentTab = tab
                        }
                    } label: {
                        Image(systemName: tab.iconName)
                            .resizable()
                            .scaledToFit()
                            .frame(width: 24, height: 40)
                            .foregroundColor(currentTab == tab ? .red : .gray)
                            .offset(y: currentTab == tab ? -10 : 0)
                            .animation(.spring(), value: currentTab)
                    }
                }
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 30)
            .frame(width: .infinity, height: .infinity)
            .background(.black)
            .clipShape(Capsule())
            
            
        }
        .frame(width:0, height: 0)
        .offset(y: -17)
    }
}
struct CustomTabBar_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
